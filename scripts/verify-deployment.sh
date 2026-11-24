#!/usr/bin/env bash
set -euo pipefail

# Verify the deployed calendar booking app.
# Usage: RENDER_URL=https://your-app.onrender.com bash scripts/verify-deployment.sh

RENDER_URL="${RENDER_URL:-https://REPLACE_WITH_RENDER_URL.onrender.com}"
BASE_URL="${RENDER_URL%/}"

echo "Verifying deployment at $BASE_URL"

# 1. Health check
echo "=> Health check"
curl -sf "$BASE_URL/health" | jq .
echo

# 2. Create a meeting type as owner
echo "=> Owner creates meeting type"
meeting_type=$(curl -sf -X POST "$BASE_URL/meeting-types" \
  -H "Content-Type: application/json" \
  -d '{"name":"Проверочная встреча","description":"30 минут","durationMinutes":30}')
echo "$meeting_type" | jq .
meeting_type_id=$(echo "$meeting_type" | jq -r '.id')
echo

# 3. List meeting types (guest view)
echo "=> Guest lists meeting types"
curl -sf "$BASE_URL/meeting-types" | jq .
echo

# 4. Get available slots
echo "=> Get available slots"
from=$(date -u +%Y-%m-%dT%H:%M:%SZ)
to=$(date -u -d '+14 days' +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -v+14d -u +%Y-%m-%dT%H:%M:%SZ)
slots_url="$BASE_URL/meeting-types/$meeting_type_id/slots?from=$from&to=$to"
slots=$(curl -sf "$slots_url")
echo "$slots" | jq '.[0:3]'
first_slot=$(echo "$slots" | jq -r '.[0].start')
echo "First slot: $first_slot"
echo

# 5. Book the first slot as guest
echo "=> Guest books the first slot"
booking=$(curl -sf -X POST "$BASE_URL/bookings" \
  -H "Content-Type: application/json" \
  -d "{\"meetingTypeId\":\"$meeting_type_id\",\"start\":\"$first_slot\",\"guestName\":\"Анна\",\"guestEmail\":\"anna@example.com\"}")
echo "$booking" | jq .
echo

# 6. Owner sees the booking
echo "=> Owner sees bookings"
curl -sf "$BASE_URL/bookings" | jq .
echo

# 7. Try to double-book the same slot (should fail with 409)
echo "=> Attempt double-booking (expect 409 Conflict)"
status=$(curl -s -o /tmp/double-book.json -w '%{http_code}' -X POST "$BASE_URL/bookings" \
  -H "Content-Type: application/json" \
  -d "{\"meetingTypeId\":\"$meeting_type_id\",\"start\":\"$first_slot\",\"guestName\":\"Борис\",\"guestEmail\":\"boris@example.com\"}")
echo "HTTP status: $status"
cat /tmp/double-book.json | jq .
if [ "$status" -ne 409 ]; then
  echo "ERROR: expected 409 Conflict, got $status"
  exit 1
fi
echo

# 8. Try to overlap by 1 minute (should also fail with 409)
echo "=> Attempt overlapping booking (expect 409 Conflict)"
overlap_start=$(date -u -d "$first_slot + 29 minutes" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -v+29M -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$first_slot" +%Y-%m-%dT%H:%M:%SZ)
status=$(curl -s -o /tmp/overlap.json -w '%{http_code}' -X POST "$BASE_URL/bookings" \
  -H "Content-Type: application/json" \
  -d "{\"meetingTypeId\":\"$meeting_type_id\",\"start\":\"$overlap_start\",\"guestName\":\"Виктор\",\"guestEmail\":\"viktor@example.com\"}")
echo "HTTP status: $status"
cat /tmp/overlap.json | jq .
if [ "$status" -ne 409 ]; then
  echo "ERROR: expected 409 Conflict, got $status"
  exit 1
fi
echo

echo "All checks passed."

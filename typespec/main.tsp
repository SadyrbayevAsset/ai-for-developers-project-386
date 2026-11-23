import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

@service(#{ title: "Calendar API" })
@server("http://localhost:3000", "Local development server")
namespace CalendarApi;

model HealthResponse {
  status: "ok";
}

@route("/health")
@get
op health(): HealthResponse;

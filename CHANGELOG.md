# Changelog

## 1.0.0 (2026-11-25)


### Features

* add home page with routing and tests ([ed091c8](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/ed091c82ee61aab26dcae75a2636064e43451b9a))
* **backend:** add meeting types and bookings endpoints ([#3](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/3)) ([b2a2809](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/b2a2809c2140d51abd360550ba3db4dd15d6d303))
* **build:** add OpenAPI and SDK generation pipeline ([#2](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/2)) ([f71f67f](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/f71f67f08056b58a27e49cbecf67b334cc84013e))
* **e2e:** add Playwright end-to-end booking scenario ([#9](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/9)) ([625451e](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/625451e1940e9e4f3b72de767c8e064341f17eb0))
* **frontend:** add meeting type selection and slot booking flow ([#5](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/5) [#6](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/6) [#7](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/7)) ([3463ceb](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/3463ceb1cd736bc09766c67c9ab687c3360c4b12))
* **frontend:** add owner admin page with meeting types and bookings ([#8](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/8)) ([e41c22e](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/e41c22e4fd57142876a2ffbdb9a8c4dd7ca6903d))
* prepare app for Docker deployment and Render MCP setup ([#13](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/13)) ([166a27c](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/166a27c207abae9d2ac5807e975b4f6b59beefe4))
* **typespec:** add meeting types and booking contract ([#1](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/1)) ([2eb4176](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/2eb4176a9b9db0d6f70316253b0f13c2fb05bc75))


### Bug Fixes

* correct frontend dist path in production static handler ([#13](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/13)) ([8d902f1](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/8d902f19ce193adb7e86c03878762447964045a0))
* improve static serving and build config for production ([#13](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/13)) ([5d36445](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/5d364459c343f38562c97f5eadc2d7a092e88b54))
* preserve vite assets route in static handler ([#13](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/13)) ([90f8f3f](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/90f8f3f1e4ddf17c7a20f52def797b35fb86fb71))
* resolve npm ci crash in Docker build ([#12](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/12)) ([8124dbc](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/8124dbc79ce2afd3d3811d0714d2b46d7ee18c4c))
* resolve npm ci crash in Docker by removing forced npm upgrade and normalizing registries ([#13](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/13)) ([a6d97d9](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/a6d97d92325f35eaad9940815c0eb451e1c879d0))
* stabilize npm installs with .npmrc and normalize typespec lockfile ([#13](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/issues/13)) ([1d6a150](https://github.com/SadyrbayevAsset/ai-for-developers-project-386/commit/1d6a1506158de50e98192078d38ce6ab0d93ab27))

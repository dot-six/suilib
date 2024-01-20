#include <napi.h>

class SUI : public Napi::Addon<SUI> {
    public:
        SUI(Napi::Env env, Napi::Object exports) {
            DefineAddon(exports, {InstanceMethod("hello", &SUI::Hello, napi_enumerable)});
        }
    private:
        Napi::Value Hello(const Napi::CallbackInfo& info) {
            return Napi::String::New(info.Env(), "world");
        }
};

NODE_API_ADDON(SUI)
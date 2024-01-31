#include <napi.h>
#include "enums/window_flags.h"

#include "vector2.h"
#include "window.h"

class Addon : public Napi::Addon<Addon> {
    public:
        Addon(Napi::Env env, Napi::Object exports) {
            DefineAddon(exports, {
                // Values
                InstanceValue("WindowFlags", prepare_property_windowflags(env))

                // Methods
            });

            sui_Vector2::Init(env, exports);
            Window::Init(env, exports);
        }
};

NODE_API_ADDON(Addon)
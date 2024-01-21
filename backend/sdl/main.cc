#include <napi.h>
#include "enums/window_flags.h"

class Addon : public Napi::Addon<Addon> {
    public:
        Addon(Napi::Env env, Napi::Object exports) {
            DefineAddon(exports, {
                // Values
                InstanceValue("WindowFlags", prepare_property_windowflags(env))

                // Methods
            });
        }
};

NODE_API_ADDON(Addon)
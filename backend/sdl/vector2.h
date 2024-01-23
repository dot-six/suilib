#ifndef __SDLBE_VECTOR2_H
#define __SDLBE_VECTOR2_H

#include <napi.h>
#include "common/getset.h"

class Vector2 : public Napi::ObjectWrap<Vector2> {
    public:
        // TODO: Create Vector2 class definition
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        // TODO: Create Vector2 constructor
        Vector2(const Napi::CallbackInfo& info);
        
        // Properties
        double x;
        double y;

        // Napi
        Macro_Method_GetSet_H(x)
        Macro_Method_GetSet_H(y)
};

#endif /* __SDLBE_VECTOR2_H */
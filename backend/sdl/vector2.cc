#include <napi.h>
#include "vector2.h"
#include "common/getset.h"

Napi::Object Vector2::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "Vector2", {
        Macro_DefClass_GetSet(Vector2, x),
        Macro_DefClass_GetSet(Vector2, y)
    });
    
    Napi::FunctionReference* constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    exports.Set("Vector2", func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

Vector2::Vector2(const Napi::CallbackInfo& info) : Napi::ObjectWrap<Vector2>(info) {
    double x_ = 0;
    double y_ = 0;

    switch (info.Length()) {
    case 1:
        x_ = (double)info[0].As<Napi::Number>();
        y_ = x_;
        break;
    case 2:
        x_ = (double)info[0].As<Napi::Number>();
        y_ = (double)info[1].As<Napi::Number>();
        break;
    }

    this->x = x_;
    this->y = y_;
}

/* Property getset macros */
Macro_Method_GetSet(Vector2, x, Napi::Number, double)
Macro_Method_GetSet(Vector2, y, Napi::Number, double)

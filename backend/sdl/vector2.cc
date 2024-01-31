#include <napi.h>
#include "vector2.h"
#include "common/getset.h"

Vector2::Vector2() {
    this->x = 0;
    this->y = 0;
}
Vector2::Vector2(double x, double y) {
    this->x = x;
    this->y = y;
}

Napi::Object Vector2::ToNapi(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Napi::Object obj = Napi::Object::New(env);
    obj.Set("x", this->x);
    obj.Set("y", this->y);

    return obj;
}

Napi::Object sui_Vector2::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "Vector2", {
        Macro_DefClass_GetSet(sui_Vector2, x),
        Macro_DefClass_GetSet(sui_Vector2, y)
    });
    
    Napi::FunctionReference* constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    exports.Set("Vector2", func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

sui_Vector2::sui_Vector2(const Napi::CallbackInfo& info) : Vector2(), Napi::ObjectWrap<sui_Vector2>(info) {
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

Napi::Value sui_Vector2::CreateNewItem(const Napi::CallbackInfo& info, double x, double y) {
    Napi::FunctionReference* constructor = info.Env().GetInstanceData<Napi::FunctionReference>();
    return constructor->New({ Napi::Number::New(info.Env(), x), Napi::Number::New(info.Env(), y) });
}

/* Property getset macros */
Macro_Method_GetSet(sui_Vector2, x, Napi::Number, double)
Macro_Method_GetSet(sui_Vector2, y, Napi::Number, double)

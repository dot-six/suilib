#ifndef __SDLBE_VECTOR2_H
#define __SDLBE_VECTOR2_H

#include <napi.h>
#include "common/getset.h"

class Vector2 {
    public:
        // Constructors
        Vector2();
        Vector2(double x, double y);

        // Properties
        double x;
        double y;

        // Methods
        Napi::Object ToNapi(const Napi::CallbackInfo& info);
};

class sui_Vector2 : public Vector2, public Napi::ObjectWrap<sui_Vector2> {
    public:
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        sui_Vector2(const Napi::CallbackInfo& info);
        static Napi::Value CreateNewItem(const Napi::CallbackInfo& info, double x, double y);

        // Napi
        Macro_Method_GetSet_H(x)
        Macro_Method_GetSet_H(y)
};

// Provide macros for Napi
#define Macro_Method_GetSet_Vector2(myClass, property)                                                      \
   Napi::Value myClass::property##Getter(const Napi::CallbackInfo& info) {                                  \
        Napi::Env env = info.Env();                                                                         \
                                                                                                            \
        return Napi::Value::From(env, this->##property.ToNapi(info));                                       \
    }                                                                                                       \
                                                                                                            \
    void myClass::property##Setter(const Napi::CallbackInfo& info, const Napi::Value& _) {                  \
        Napi::Env env = info.Env();                                                                         \
                                                                                                            \
        Napi::Object v = info[0].As<Napi::Object>();                                                        \
        this->property.x = ((Napi::Value)v["x"]).As<Napi::Number>().DoubleValue();                          \
        this->property.y = ((Napi::Value)v["y"]).As<Napi::Number>().DoubleValue();                          \
    }

#endif /* __SDLBE_VECTOR2_H */
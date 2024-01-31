#ifndef BE_COMMON_GETSET_H_
#define BE_COMMON_GETSET_H_

#define Macro_DefClass_GetSet(myClass, property)                                                            \
    InstanceAccessor(#property, &myClass::property##Getter, &myClass::property##Setter)

#define Macro_Method_GetSet_H(property)                                                                     \
    Napi::Value property##Getter(const Napi::CallbackInfo& info);                                           \
    void property##Setter(const Napi::CallbackInfo& info, const Napi::Value& _);

#define Macro_Method_GetSet(myClass, property, napityping, rawtyping)                                       \
    Napi::Value myClass::property##Getter(const Napi::CallbackInfo& info) {                                 \
        Napi::Env env = info.Env();                                                                         \
                                                                                                            \
        return Napi::Value::From(env, this->property);                                                      \
    }                                                                                                       \
                                                                                                            \
    void myClass::property##Setter(const Napi::CallbackInfo& info, const Napi::Value& _) {                  \
        Napi::Env env = info.Env();                                                                         \
                                                                                                            \
        this->property = (rawtyping)(info[0].As<napityping>());                                             \
    }

#define Macro_Method_Set(myClass, property)                                                                 \
    void myClass::property##Setter(const Napi::CallbackInfo& info, const Napi::Value& _)                    \

#endif /* BE_COMMON_GETSET_H_ */
#include <napi.h>

#include "common/getset.h"
#include "event.h"

Napi::Object sui_Event::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "Event", {
        Macro_DefClass_GetSet(sui_Event, type),
        Macro_DefClass_GetSet(sui_Event, common),
        Macro_DefClass_GetSet(sui_Event, display),
        Macro_DefClass_GetSet(sui_Event, window),
        Macro_DefClass_GetSet(sui_Event, key),
        Macro_DefClass_GetSet(sui_Event, edit),
        Macro_DefClass_GetSet(sui_Event, editExt),
        Macro_DefClass_GetSet(sui_Event, text),
        Macro_DefClass_GetSet(sui_Event, motion),
        Macro_DefClass_GetSet(sui_Event, button),
        Macro_DefClass_GetSet(sui_Event, wheel),
        Macro_DefClass_GetSet(sui_Event, jaxis),
        Macro_DefClass_GetSet(sui_Event, jball),
        Macro_DefClass_GetSet(sui_Event, jhat),
        Macro_DefClass_GetSet(sui_Event, jbutton),
        Macro_DefClass_GetSet(sui_Event, jdevice),
        Macro_DefClass_GetSet(sui_Event, jbattery),
        Macro_DefClass_GetSet(sui_Event, caxis),
        Macro_DefClass_GetSet(sui_Event, cbutton),
        Macro_DefClass_GetSet(sui_Event, cdevice),
        Macro_DefClass_GetSet(sui_Event, ctouchpad),
        Macro_DefClass_GetSet(sui_Event, csensor),
        Macro_DefClass_GetSet(sui_Event, adevice),
        Macro_DefClass_GetSet(sui_Event, sensor),
        Macro_DefClass_GetSet(sui_Event, quit),
        Macro_DefClass_GetSet(sui_Event, user),
        Macro_DefClass_GetSet(sui_Event, syswm),
        Macro_DefClass_GetSet(sui_Event, tfinger),
        Macro_DefClass_GetSet(sui_Event, mgesture),
        Macro_DefClass_GetSet(sui_Event, dgesture),
        Macro_DefClass_GetSet(sui_Event, drop)
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    exports.Set("Event", func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

sui_Event::sui_Event(const Napi::CallbackInfo& info) : Napi::ObjectWrap<sui_Event>(info) {}
sui_Event::sui_Event(const Napi::CallbackInfo& info, const SDL_Event& event) : Napi::ObjectWrap<sui_Event>(info) {}

// TODO: Implement these things
Macro_Method_GetSet(sui_Event, type, Napi::Number, unsigned int)

#define Macro_MakeObj() Napi::Object obj = Napi::Object::New(info.Env());
#define Macro_MakeProp(prop) obj.Set(#prop, this->FROM.prop);

Napi::Value sui_Event::commonGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#define FROM common
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)

    return obj;
}

Napi::Value sui_Event::displayGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM display
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(display)
    Macro_MakeProp(event)
    Macro_MakeProp(data1)

    return obj;
}

Napi::Value sui_Event::windowGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM window
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(event)
    Macro_MakeProp(padding1)
    Macro_MakeProp(padding2)
    Macro_MakeProp(padding3)
    Macro_MakeProp(data1)
    Macro_MakeProp(data2)

    return obj;
}

Napi::Value sui_Event::keyGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM key
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(state)
    Macro_MakeProp(repeat)
    Macro_MakeProp(padding2)
    Macro_MakeProp(padding3)
    // TODO: Macro_MakeProp(keysym)

    return obj;
}

Napi::Value sui_Event::editGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM edit
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(text)
    Macro_MakeProp(start)
    Macro_MakeProp(length)

    return obj;
}

Napi::Value sui_Event::editExtGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM editExt
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(text)
    Macro_MakeProp(start)
    Macro_MakeProp(length)

    return obj;
}

Napi::Value sui_Event::textGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM text
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(text)

    return obj;
}

Napi::Value sui_Event::motionGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM motion
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(which)
    Macro_MakeProp(state)
    Macro_MakeProp(x)
    Macro_MakeProp(y)
    Macro_MakeProp(xrel)
    Macro_MakeProp(yrel)

    return obj;
}

Napi::Value sui_Event::buttonGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM button
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(which)
    Macro_MakeProp(button)
    Macro_MakeProp(state)
    Macro_MakeProp(clicks)
    Macro_MakeProp(padding1)
    Macro_MakeProp(x)
    Macro_MakeProp(y)

    return obj;
}

Napi::Value sui_Event::wheelGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM wheel
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    Macro_MakeProp(windowID)
    Macro_MakeProp(which)
    Macro_MakeProp(x)
    Macro_MakeProp(y)
    Macro_MakeProp(direction)
    Macro_MakeProp(preciseX)
    Macro_MakeProp(preciseY)
    Macro_MakeProp(mouseX)
    Macro_MakeProp(mouseY)

    return obj;
}

Napi::Value sui_Event::jaxisGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM jaxis
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    // TODO: Macro_MakeProp(which)
    Macro_MakeProp(axis)
    Macro_MakeProp(padding1)
    Macro_MakeProp(padding2)
    Macro_MakeProp(padding3)
    Macro_MakeProp(value)
    Macro_MakeProp(padding4)

    return obj;
}

Napi::Value sui_Event::jballGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM jball
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    // TODO: Macro_MakeProp(which)
    Macro_MakeProp(ball)
    Macro_MakeProp(padding1)
    Macro_MakeProp(padding2)
    Macro_MakeProp(padding3)
    Macro_MakeProp(xrel)
    Macro_MakeProp(yrel)

    return obj;
}

Napi::Value sui_Event::jhatGetter(const Napi::CallbackInfo& info) {
    Macro_MakeObj()

#undef FROM
#define FROM jhat
    Macro_MakeProp(type)
    Macro_MakeProp(timestamp)
    // TODO: Macro_MakeProp(which)
    Macro_MakeProp(hat)
    Macro_MakeProp(value)
    Macro_MakeProp(padding1)
    Macro_MakeProp(padding2)

    return obj;
}

Napi::Value sui_Event::jbuttonGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::jdeviceGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::jbatteryGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::caxisGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::cbuttonGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::cdeviceGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::ctouchpadGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::csensorGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::adeviceGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::sensorGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::quitGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::userGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::syswmGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::tfingerGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::mgestureGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::dgestureGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }
Napi::Value sui_Event::dropGetter(const Napi::CallbackInfo& info) { return Napi::Value::Value(); }

void sui_Event::commonSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::displaySetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::windowSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::keySetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::editSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::editExtSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::textSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::motionSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::buttonSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::wheelSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::jaxisSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::jballSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::jhatSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::jbuttonSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::jdeviceSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::jbatterySetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::caxisSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::cbuttonSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::cdeviceSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::ctouchpadSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::csensorSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::adeviceSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::sensorSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::quitSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::userSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::syswmSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::tfingerSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::mgestureSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::dgestureSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}
void sui_Event::dropSetter(const Napi::CallbackInfo& info, const Napi::Value& _) {}

#undef FROM
#undef Macro_MakeObj
#undef Macro_MakeProp
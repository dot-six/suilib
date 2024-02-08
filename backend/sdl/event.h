#ifndef __SDLBE_EVENT_H
#define __SDLBE_EVENT_H

#include <napi.h>
#include <SDL_events.h>

class sui_Event : public Napi::ObjectWrap<sui_Event> {
    public:
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        sui_Event(const Napi::CallbackInfo& info);
        sui_Event(const Napi::CallbackInfo& info, const SDL_Event& event);

        // Expose SDL
        // I don't know any better
        Uint32 type;
        SDL_CommonEvent common;
        SDL_DisplayEvent display;
        SDL_WindowEvent window;
        SDL_KeyboardEvent key;
        SDL_TextEditingEvent edit;
        SDL_TextEditingExtEvent editExt;
        SDL_TextInputEvent text;
        SDL_MouseMotionEvent motion;
        SDL_MouseButtonEvent button;
        SDL_MouseWheelEvent wheel;
        SDL_JoyAxisEvent jaxis;
        SDL_JoyBallEvent jball;
        SDL_JoyHatEvent jhat;
        SDL_JoyButtonEvent jbutton;
        SDL_JoyDeviceEvent jdevice;
        SDL_JoyBatteryEvent jbattery;
        SDL_ControllerAxisEvent caxis;
        SDL_ControllerButtonEvent cbutton;
        SDL_ControllerDeviceEvent cdevice;
        SDL_ControllerTouchpadEvent ctouchpad;
        SDL_ControllerSensorEvent csensor;
        SDL_AudioDeviceEvent adevice;
        SDL_SensorEvent sensor;
        SDL_QuitEvent quit;
        SDL_UserEvent user;
        SDL_SysWMEvent syswm;
        SDL_TouchFingerEvent tfinger;
        SDL_MultiGestureEvent mgesture;
        SDL_DollarGestureEvent dgesture;
        SDL_DropEvent drop;

        Macro_Method_GetSet_H(type);
        Macro_Method_GetSet_H(common);
        Macro_Method_GetSet_H(display);
        Macro_Method_GetSet_H(window);
        Macro_Method_GetSet_H(key);
        Macro_Method_GetSet_H(edit);
        Macro_Method_GetSet_H(editExt);
        Macro_Method_GetSet_H(text);
        Macro_Method_GetSet_H(motion);
        Macro_Method_GetSet_H(button);
        Macro_Method_GetSet_H(wheel);
        Macro_Method_GetSet_H(jaxis);
        Macro_Method_GetSet_H(jball);
        Macro_Method_GetSet_H(jhat);
        Macro_Method_GetSet_H(jbutton);
        Macro_Method_GetSet_H(jdevice);
        Macro_Method_GetSet_H(jbattery);
        Macro_Method_GetSet_H(caxis);
        Macro_Method_GetSet_H(cbutton);
        Macro_Method_GetSet_H(cdevice);
        Macro_Method_GetSet_H(ctouchpad);
        Macro_Method_GetSet_H(csensor);
        Macro_Method_GetSet_H(adevice);
        Macro_Method_GetSet_H(sensor);
        Macro_Method_GetSet_H(quit);
        Macro_Method_GetSet_H(user);
        Macro_Method_GetSet_H(syswm);
        Macro_Method_GetSet_H(tfinger);
        Macro_Method_GetSet_H(mgesture);
        Macro_Method_GetSet_H(dgesture);
        Macro_Method_GetSet_H(drop);
    private:
        SDL_Event* event;
};

#endif /* __SDLBE_EVENT_H */
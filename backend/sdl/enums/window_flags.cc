#include <napi.h>
#include <SDL_video.h>

#include "window_flags.h"

Napi::Value prepare_property_windowflags(Napi::Env env) {
    Napi::Object wf = Napi::Object::New(env);

    wf.Set("SHOWN", (int)SDL_WINDOW_SHOWN);
    wf.Set("FULLSCREEN", (int)SDL_WINDOW_FULLSCREEN);
    wf.Set("OPENGL", (int)SDL_WINDOW_OPENGL);
    wf.Set("SHOWN", (int)SDL_WINDOW_SHOWN);
    wf.Set("HIDDEN", (int)SDL_WINDOW_HIDDEN);
    wf.Set("BORDERLESS", (int)SDL_WINDOW_BORDERLESS);
    wf.Set("RESIZABLE", (int)SDL_WINDOW_RESIZABLE);
    wf.Set("MINIMIZED", (int)SDL_WINDOW_MINIMIZED);
    wf.Set("MAXIMIZED", (int)SDL_WINDOW_MAXIMIZED);
    wf.Set("MOUSE_GRABBED", (int)SDL_WINDOW_MOUSE_GRABBED);
    wf.Set("INPUT_FOCUS", (int)SDL_WINDOW_INPUT_FOCUS);
    wf.Set("MOUSE_FOCUS", (int)SDL_WINDOW_MOUSE_FOCUS);
    wf.Set("FULLSCREEN_DESKTOP", (int)SDL_WINDOW_FULLSCREEN_DESKTOP);
    wf.Set("FOREIGN", (int)SDL_WINDOW_FOREIGN);
    wf.Set("ALLOW_HIGHDPI", (int)SDL_WINDOW_ALLOW_HIGHDPI);
    wf.Set("MOUSE_CAPTURE", (int)SDL_WINDOW_MOUSE_CAPTURE);
    wf.Set("ALWAYS_ON_TOP", (int)SDL_WINDOW_ALWAYS_ON_TOP);
    wf.Set("SKIP_TASKBAR", (int)SDL_WINDOW_SKIP_TASKBAR);
    wf.Set("UTILITY", (int)SDL_WINDOW_UTILITY);
    wf.Set("TOOLTIP", (int)SDL_WINDOW_TOOLTIP);
    wf.Set("POPUP_MENU", (int)SDL_WINDOW_POPUP_MENU);
    wf.Set("KEYBOARD_GRABBED", (int)SDL_WINDOW_KEYBOARD_GRABBED);
    wf.Set("VULKAN", (int)SDL_WINDOW_VULKAN);
    wf.Set("METAL", (int)SDL_WINDOW_METAL);
    wf.Set("INPUT_GRABBED", (int)SDL_WINDOW_INPUT_GRABBED);

    return wf;
}
#include <napi.h>
#include "window.h"
#include "vector2.h"
#include "common/getset.h"

Napi::Object Window::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "Window", {
        Macro_DefClass_GetSet(Window, title),
        Macro_DefClass_GetSet(Window, position),
        Macro_DefClass_GetSet(Window, size)
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    exports.Set("Window", func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

Window::Window(const Napi::CallbackInfo& info) : ObjectWrap<Window>(info) {
    /**
     * USAGE:
     * new Window(string title, vector2 position, vector2 size, uint flags);
     **/

    this->title = info[0].As<Napi::String>().Utf8Value();
    
    Vector2* pos = Napi::ObjectWrap<sui_Vector2>::Unwrap(info[1].As<Napi::Object>());
    Vector2* siz = Napi::ObjectWrap<sui_Vector2>::Unwrap(info[2].As<Napi::Object>());
    unsigned int flags = info[3].As<Napi::Number>().Uint32Value();

    this->position = Vector2(pos->x, pos->y);
    this->size = Vector2(siz->x, siz->y);

    // Initialize SDL
    if (SDL_WasInit(SDL_INIT_EVERYTHING) != 0) {
        SDL_Init(SDL_INIT_EVERYTHING);
    }

    window = SDL_CreateWindow(this->title.c_str(), this->position.x, this->position.y, this->size.x, this->size.y, flags);
    // TODO: Implement renderer index
    // TODO: Implement renderer flags
    renderer = SDL_CreateRenderer(window, -1, 0);
}

/* Property getset macros */
Macro_Method_GetSet(Window, title, Napi::String, std::string)

Macro_Method_GetSet_Vector2(Window, position)
Macro_Method_GetSet_Vector2(Window, size)

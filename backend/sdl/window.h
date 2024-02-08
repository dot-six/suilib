#ifndef __SDLBE_WINDOW_H
#define __SDLBE_WINDOW_H

#include <napi.h>
#include <SDL.h>

#include "vector2.h"
#include "common/getset.h"
#include "event.h"

// The purpose of this class is to expose methods that are beneficial for rendering
// TODO: Find a way to initialize SDL once
class Window : public Napi::ObjectWrap<Window> {
    public:
        // TODO: Create Window initialization function
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        // TODO: Create Window constructor
        Window(const Napi::CallbackInfo& info);

        // TODO: Define CreateWindow static function
        static Napi::Value CreateWindow(Napi::CallbackInfo& info);

        Napi::Object PollEvent(const Napi::CallbackInfo& info);

        // Properties
        std::string title;
        Vector2 position;
        Vector2 size;

        Macro_Method_GetSet_H(title)
        Macro_Method_GetSet_H(position)
        Macro_Method_GetSet_H(size)
    private:
        SDL_Window* window;
        SDL_Renderer* renderer;
};

#endif /* __SDLBE_WINDOW_H */
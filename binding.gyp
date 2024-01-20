{
  "targets": [{
    "target_name": "sdl",
    "include_dirs": [
      "<(module_root_dir)/third_party/sdl/include",
      "<!(node -e \"require('nan')\")",
      "<!@(node -p \"require('node-addon-api').include\")"
    ],
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "conditions": [
      ["OS==\"win\"", {
        "defines": [
          "NAPI_DISABLE_CPP_EXCEPTIONS"
        ],
        "copies": [{
          "destination": "<(module_root_dir)/build/Release/",
          "files": [
            "<(module_root_dir)/third_party/sdl/platform/win/lib/SDL2.dll"
          ]
        }],
        "libraries": [
          "<(module_root_dir)/third_party/sdl/platform/win/lib/SDL2.lib"
        ],
      }]
    ],
    "sources": [
      "./src/suilib.cc",
    ],
    "dependencies": [
    #   "keycode.cc"
    ]
  }]
}

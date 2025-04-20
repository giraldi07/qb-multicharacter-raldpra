fx_version 'cerulean'
game 'gta5'
lua54 'yes'
author 'RaldPra Blossom Team'
description 'Allows players to create multiple characters'
version '1.0.0'

shared_scripts {
    '@qb-core/shared/locale.lua',
    'locales/en.lua',
    'locales/*.lua',
    'config.lua'
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    '@qb-apartments/config.lua',
    'server/main.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/assets/index-UKUzV2zY.css',
    'html/assets/index-TQDZlfwq.js',
    'html/assets/musicbg-D7CwhTIG.mp3',
    'html/assets/myLogo-DiFUIK3v.png',
    'html/assets/studiobg-BX_-Z8w2.png'
}

dependencies {
    'qb-core',
    'qb-spawn'
}

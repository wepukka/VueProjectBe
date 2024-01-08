# BoredGamer backend

Node Express Backend for [BoredGamerFront](https://github.com/wepukka/BoredGamerFront)

**BoredGamer Backend** is not currently deployed

## API

**BoredGamer** gets data from [FreeToGame](https://www.freetogame.com/api-doc) API via [RAPIDAPI](https://rapidapi.com/digiwalls/api/free-to-play-games-database/)

    ROUTES

    api/games?platform=platform&genre=genre => provides data with given params

    api/genres => maps all games and returns every genre (Only used for development to check genres incase changes in FreeToGame API)

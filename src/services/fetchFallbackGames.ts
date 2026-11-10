import { fallbackGames } from '../data/fallbackGames.ts'
import { GAME_GENRES } from '../data/genre.ts'
import type { GamesResult } from './gameService.ts'
import type { FetchGamesParams } from './rawgApi.ts'
import type { Game } from '../type/game.ts'

export const fetchFallbackGames = async (
    params?: FetchGamesParams
): Promise<GamesResult> => {
    let filteredGames = [...fallbackGames]

    if (params?.search) {
        const search = params.search.toLowerCase()

        filteredGames = filteredGames.filter((game) =>
            game.name.toLowerCase().includes(search)
        )
    }

    if (params?.genres) {
        const selectedGenres = params.genres.split(',')

        filteredGames = filteredGames.filter((game) =>
            selectedGenres.some((slug) => {
                const genre = GAME_GENRES.find((g) => g.slug === slug)

                return genre && game.genres?.includes(genre.name)
            })
        )
    }

    const sortedGames = filteredGames.sort((a, b) => {
        switch (params?.ordering) {
            case '-rating':
                return b.rating - a.rating
            case '-added':
                return b.added - a.added
            case '-updated':
                return b.updated - a.updated
            default:
                return 0
        }
    })

    const count = sortedGames.length

    const pageSize = params?.page_size ?? 20
    const page = params?.page ?? 1
    const start = (page - 1) * pageSize

    const games = sortedGames.slice(start, start + pageSize)

    return { games, count }
}

export const fetchFallbackGame = async (id: number): Promise<Game> => {
    const game = fallbackGames.find((fallback) => fallback.id === id)

    if (!game) {
        throw new Error('Game not found.')
    }

    return { ...game }
}

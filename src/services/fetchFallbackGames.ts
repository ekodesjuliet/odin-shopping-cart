import { fallbackGames } from '../data/fallbackGames.ts'
import type { GamesResult } from './gameService.ts'
import type { FetchGamesParams } from './rawgApi.ts'
import type { Game } from '../type/game.ts'

export const fetchFallbackGames = async (
    params?: FetchGamesParams
): Promise<GamesResult> => {
    const sortedGames = [...fallbackGames].sort((a, b) => {
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

    const pageSize = params?.page_size ?? 20
    const page = params?.page ?? 1
    const start = (page - 1) * pageSize

    const games = sortedGames.slice(start, start + pageSize)

    return { games, count: games.length }
}

export const fetchFallbackGame = async (id: number): Promise<Game> => {
    const game = fallbackGames.find((fallback) => fallback.id === id)

    if (!game) {
        throw new Error('Game not found.')
    }

    return { ...game }
}

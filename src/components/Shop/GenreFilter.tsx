import { GAME_GENRES } from '../../data/genre'

type GenreFilterProps = {
    selectedGenres: string[]
    onChange: (genre: string) => void
}

export const GenreFilter = ({ selectedGenres, onChange }: GenreFilterProps) => (
    <fieldset className="mb-6 flex flex-col gap-2">
        <legend className="mb-1 text-sm font-semibold tracking-wide text-[#F2E4D1] uppercase">
            Genre
        </legend>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 md:grid-cols-3 lg:grid-cols-1">
            {GAME_GENRES.map((genre) => (
                <label
                    key={genre.slug}
                    htmlFor={`genre-${genre.slug}`}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#F2E4D1]"
                >
                    <input
                        id={`genre-${genre.slug}`}
                        type="checkbox"
                        value={genre.slug}
                        checked={selectedGenres.includes(genre.slug)}
                        onChange={() => onChange(genre.slug)}
                        className="size-4 shrink-0 accent-blue-500"
                    />
                    {genre.name}
                </label>
            ))}
        </div>
    </fieldset>
)

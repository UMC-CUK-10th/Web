import MenuLink from "./menuLink"

export default function Navbar() {

    return (
        <nav className="
            sticky top-0
            z-50
            bg-gray-100
            border-b
            border-gray-200
        ">
            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    h-16
                    flex
                    items-center
                    gap-5
                "
            >
                <MenuLink url="/" title="홈"></MenuLink>
                <MenuLink url="/movies" title="인기영화"></MenuLink>
            </div>
        </nav>
    )
}
import { NavLink } from "react-router-dom";

interface MenuLinkProps {
    title: string,
    url: string
}

export default function MenuLink({ title, url }: MenuLinkProps) {
    return (
        <NavLink to={url} className="
                    text-xl font-medium
                    text-gray-600
                    hover:text-blue-600
                    transition-colors
                "
        >
            {title}
        </NavLink>
    )
}
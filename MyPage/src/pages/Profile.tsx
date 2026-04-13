import { useUser } from "../context/UserContext";

export default function Profile() {
    const { user } = useUser();

    return (
        <div>
            {user ? <div>
                <p>이메일: {user?.email}</p>
                <p>이름: {user?.name}</p>
            </div> : <p>로그인 유저가 없습니다.</p>}
        </div>
    )
}
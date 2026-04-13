interface PersonCardProps {
  name: string;
  role: string;
  profilePath: string | null;
}

export const PersonCard = ({ name, role, profilePath }: PersonCardProps) => {
  return (
    <div className="text-center">
      {profilePath ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${profilePath}`}
          alt={name}
          className="mx-auto h-24 w-24 rounded-full border-2 border-white object-cover"
        />
      ) : (
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-white bg-zinc-800 text-xs">
          No img
        </div>
      )}    

      <p className="mt-3 text-sm font-bold">{name}</p>
      <p className="text-xs text-zinc-300">{role}</p>
    </div>
  );
};


export default function InformationPLV({
  commune,
  date,
  region,
  departement,
  insee



}) {
  return (
    <div
      className="w-full mt-10"
    >
      <h1 className="font-bold  w-full text-left p-4 uppercase">informartion sur le prélèvement </h1>
      <div className="grid grid-cols-1 justify-center items-start  md:grid-cols-3 gap-2 w-full p-2">
        <div className="border border-r-2  border-green-50 rounded-lg shadow-sm">
          <div className="uppercase border-green-50 font-bold text-primary-50">commune</div>
          <div>{commune || "Paris 01 75101"}</div>
        </div>
        <div className="border border-r-2  border-green-50 rounded-lg shadow-sm">
          <div className="uppercase text-primary-50 font-bold">dete du dernier prélèvement</div>
          <div>{date || "17-02-2026"}</div>
        </div>
        <div className="border border-r-2  border-green-50 rounded-lg shadow-sm">
          <div className="uppercase text-primary-50 font-bold">Ragion</div>
          <div>{region || "Île-de-France (11)"}</div>
        </div>
        <div className="border border-r-2  border-green-50 rounded-lg shadow-l">
          <div className="uppercase text-primary-50 font-bold">département</div>
          <div>{departement || 'Paris (75)'}</div>
        </div>
         <div className="border border-r-2  border-green-50 rounded-lg shadow-l">
          <div className="uppercase text-primary-50 font-bold">INSEE</div>
          <div>{insee || '75101'}</div>
        </div>
      </div>

      <h1 className="w-full text-center">Date de mise à jour :  {date || '17-02-2026'}</h1>
      <h1 className="w-full text-center">Pour en savoir plus sur la qualité de mon eau : <a href="/sante.gouv.fr">sante.gouv.fr</a></h1>
    </div>
  );
}

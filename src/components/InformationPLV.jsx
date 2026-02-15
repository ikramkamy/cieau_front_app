

export default function InformationPLV({
    commune,
    date,
    conclusion,
    onDetailsClick
}) {
    return (
        <div
            className="w-full mt-10"
        >
<h1 className="font-bold text-2xl w-full text-left p-4 uppercase">informartion sur le prélèvement </h1>
<div className="grid grid-cols-1 justify-center items-start  md:grid-cols-3 gap-2 w-full p-2">
<div className="border border-r-2  border-green-50 rounded-lg shadow-sm">
  <div className="uppercase border-green-50 font-bold">commune</div>
  <div>{commune}</div>
</div>
<div className="border border-r-2  border-green-50 rounded-lg shadow-sm">
  <div className="uppercase text-primary-50 font-bold">dete du dernier prélèvement</div>
  <div>{commune}</div>
</div>
<div className="border border-r-2  border-green-50 rounded-lg shadow-sm">
  <div className="uppercase text-primary-50 font-bold">Ragion</div>
  <div>{commune}</div>
</div>
<div className="border border-r-2  border-green-50 rounded-lg shadow-l">
  <div className="uppercase text-primary-50 font-bold">département</div>
  <div>{commune}</div>
</div>
</div>

<h1 className="w-full text-center">Date de mise à jour :  {date}</h1>
<h1 className="w-full text-center">Pour en savoir plus sur la qualité de mon eau : <a href="/sante.gouv.fr">sante.gouv.fr</a></h1>
        </div>
    );
}

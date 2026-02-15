import frame from '/images/Frame.png'
import '../App.css';
export default function CommunePopup({
  bacterio,
  date,
  conclusion,
  onDetailsClick
}) {
  return (
    <div
      className="w-full"
    >
      <div className="bg-white  flex flex-col justify-between relative rounded-xl overflow-hidden">
        
        {/* Background Image */}
        <img src={frame} alt="frame" className="w-full h-[45%] absolute" />

        {/* Overlay (si tu veux l’utiliser plus tard) */}
        <div className="absolute inset-0 z-1"></div>

        {/* Top Section */}
        <div className="relative z-10 p-2 w-full flex flex-col gap-2">
          <div className="flex w-full justify-between items-center px-2 mt-2">
            <span className="uppercase font-bold text-xs">
              conformité bactériologique :
            </span>

            {bacterio === 1 ? (
              <span className="text-success-100 flex items-center">
                <div className="w-2 h-2 bg-success-100 shadow-lg rounded-full mr-1"></div>
                <div>oui</div>
              </span>
            ) : (
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red-500 shadow-lg rounded-full mr-1"></div>
                <div>non</div>
              </span>
            )}
          </div>

          <div className="w-full flex justify-between font-bold px-2">
            <span>Date Derniers Prélèvements:</span>
            <span>{date || "Non disponible"}</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 w-full flex flex-col py-4 px-2 mt-auto">
          <div className="pl-2 text-start w-full uppercase font-extrabold text-sm mb-1">
            conclusion
          </div>

          <div className="pl-2 w-[450px] text-start text-sm break-words whitespace-normal">
            {conclusion || "Non disponible"}
          </div>

          {/* <button
            onClick={onDetailsClick}
            className="rounded-md px-4 py-2 uppercase w-fit mt-4 border bg-secondary-50 text-white"
          >
            voir détails
          </button> */}
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from 'react'
// import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import { Polygon } from 'react-leaflet'

// const fixLeafletIcons = () => {
//   delete L.Icon.Default.prototype._getIconUrl
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
//   })
// }


// const francePolygon = [
//   // Contour principal de la France métropolitaine
//   [51.089, 2.546], // Nord - Dunkerque
//   [50.128, 1.625], // Côte nord-ouest
//   [49.433, -0.156], // Normandie
//   [48.644, -1.571], // Bretagne
//   [47.281, -2.392], // Loire-Atlantique
//   [46.372, -1.402], // Vendée
//   [45.041, -1.181], // Aquitaine côte
//   [43.384, -1.773], // Pays Basque
//   [42.551, 3.115], // Côte méditerranéenne - Perpignan
//   [43.295, 7.535], // Côte d'Azur - Menton
//   [44.056, 7.748], // Alpes-Maritimes
//   [45.776, 7.051], // Mont Blanc région
//   [46.254, 6.141], // Genève
//   [47.588, 7.589], // Alsace
//   [48.966, 8.224], // Forêt Noire frontière
//   [49.017, 6.155], // Lorraine
//   [49.443, 5.898], // Luxembourg frontière
//   [50.128, 6.156], // Belgique frontière
//   [50.835, 4.350], // Lille région
//   [51.089, 2.546]  // Retour au point de départ
// ];
// const worldPolygon = [
//   [90, -180],  // Coin nord-ouest du monde
//   [90, 180],   // Coin nord-est du monde
//   [-90, 180],  // Coin sud-est du monde
//   [-90, -180], // Coin sud-ouest du monde
//   [90, -180]   // Retour au départ
// ];
// // Coordonnées approximatives des frontières françaises
// const franceBounds = [
//   [41.0, -5.5],  // Sud-Ouest (Corse incluse)
//   [51.5, 10.0]   // Nord-Est
// ];

// function CarteFrance() {
//   const [communes, setCommunes] = useState([])

//   useEffect(() => {
//     fixLeafletIcons()

//     fetch("https://immar-media.com/cieau/api/index.php/communes")
//       .then(res => res.json())
//       .then(data => {
//         // Filtre France métropolitaine (DOM-TOM exclus)
//         const metropoleCommunes = data.communes.filter(c => {
//           const dep = Number(c.DEP)
//           return (dep >= 1 && dep <= 95) || dep === 2 // 2A et 2B pour la Corse
//         })

//         let i = 0
//         const batchSize = 500
//         const interval = setInterval(() => {
//           setCommunes(prev => [...prev, ...metropoleCommunes.slice(i, i + batchSize)])
//           i += batchSize
//           if (i >= metropoleCommunes.length) clearInterval(interval)
//         }, 50)
//       })
//   }, [])

//   return (
//     <>
//       <h1 className='text-yellow-200'>CEAU</h1>
//       <div className="card"></div>

//       <div className="map-container">
//         <MapContainer
//           bounds={franceBounds}
//           minZoom={5} // Empêche de trop zoomer out
//           maxBounds={franceBounds}
//           maxBoundsViscosity={1.0} // Empêche complètement de sortir des bounds
//           scrollWheelZoom={true}
//           style={{ height: '100vh', width: '100vw' }}
//         >
//           {/* <TileLayer
//             url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
//             attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             maxZoom={20}
//             minZoom={5}
//             bounds={franceBounds}
//           /> */}
//           <TileLayer
//             url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
//             attribution='Tiles &copy; Esri'
//             maxZoom={16}
//             bounds={franceBounds}
//           />
//           {/* <TileLayer
//             url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
//             attribution='&copy; OpenStreetMap contributors &copy; CARTO'
//           /> */}

//           {communes.map((commune, index) => {
//             const lat = Number(commune.LAT)
//             const lon = Number(commune.LON)
//             if (isNaN(lat) || isNaN(lon)) return null

//             return (
//               <CircleMarker
//                 key={`commune-${index}`}
//                 center={[lat, lon]}
//                 radius={6}
//                 fillColor="#00d7c0"
//                 color="#00d7c0"
//                 weight={2}
//                 fillOpacity={0.1}
//               >

//                 <Popup>
//                   <div>
//                     <h3>{commune.LIBELLE}</h3>
//                     <p>Lat: {lat}</p>
//                     <p>Lng: {lon}</p>
//                   </div>
//                 </Popup>
//               </CircleMarker>
//             );
//           })}

//         </MapContainer>
//       </div>
//     </>
//   )
// }

import { useState, useEffect } from 'react'
import SplashScreen from './splashscreen'
import Header from '../components/Header'
import axios from 'axios'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Fix des icônes Leaflet
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}
function CarteFrance() {
  const [communes, setCommunes] = useState([])
  const [display, setDisplay] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(6)
  // Bornes de la France
  const franceBounds = [
    // [41.0, -5.5],
    // [51.5, 10.0]
     [41.0, -6.0],  // Bottom-left
  [52.0, 10.0]   // Top-right
  ]
  // Centre de la France
  const centerFrance = [46.603354, 1.888334]
  useEffect(() => {
    const loadAllCommunes = async () => {
      try {
        const response = await axios.get("https://immar-media.com/cieau/api/index.php/conformites")
        const data = response.data.conformites
        console.log("response", data)
        if (data && Array.isArray(data)) {
          const allCommunes = data
            .filter(commune => {
              const lat = parseFloat(commune.LAT)
              const lon = parseFloat(commune.LON)
              const dep = parseInt(commune.DEP)

              return !isNaN(lat) && !isNaN(lon) && !isNaN(dep) &&
                ((dep >= 1 && dep <= 95) || dep === 2)
            })
            .map((commune, i) => ({
              id: `${commune.DEP}-${commune.COM}-${i}`,
              lat: parseFloat(commune.LAT),
              lon: parseFloat(commune.LON),
              bacterio:commune.CBL,
              libelle: commune.LIBELLE || `Commune ${i}`,
              dep: commune.DEP,
              com: commune.COM
            }))
          console.log(`${allCommunes.length} communes chargées`)
          setCommunes(allCommunes)
        }
      } catch (error) {
        console.error('Erreur:', error)
        // Données de test
        const testData = Array.from({ length: 0 }, (_, i) => ({
          id: `test-${i}`,
          lat: 41 + Math.random() * 10.5,
          lon: -5.5 + Math.random() * 15.5,
          libelle: `Commune ${i}`,
          bacterio:commune.CBL,
          dep: String(Math.floor(Math.random() * 95) + 1).padStart(2, '0'),
          com: String(i).padStart(3, '0')
        }))
        setCommunes(testData)
      } finally {
        setIsLoading(false)
      }
    }
    loadAllCommunes()
  }, [])
  setTimeout(() => {
    setDisplay(false)
  }, [8000])
  const displayLimit = 900
  const communesToDisplay = communes.slice(0, displayLimit)

  return (
    <div className='bg-transparent' style={{ width: '100%', height: '100vh', position: 'relative' }}>

      <Header />
      <h1 className='uppercase text-primary-50 font-bold'>QUELLE EST LA QUALITÉ DE MON EAU DU ROBINET ?</h1>
      {display && <SplashScreen />}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        color: '#fbbf24',
        padding: '10px',
        borderRadius: '5px',
        display: "none"
      }}>
        <strong>CEAU</strong> - {isLoading ? 'Chargement...' : `${communesToDisplay.length}/${communes.length} communes`}
        <br />
        <small>Zoom: {zoom.toFixed(1)}</small>
      </div>

<MapContainer
        center={centerFrance}
        zoom={zoom}
        minZoom={5}
        maxZoom={15}
        bounds={franceBounds}
        maxBounds={franceBounds}
        maxBoundsViscosity={1.0}
        style={{ width: '100%', height: '100%' }}
       whenCreated={(map) => {
    // Force fit to France bounds immediately
    map.fitBounds(franceBounds, {
      padding: [0, 0],      // No padding
      maxZoom: 6,           // Don't zoom in too much initially
      animate: false        // Do it immediately
    });
    
    // Set bounds to prevent panning outside France
    map.setMaxBounds(franceBounds);
    
    map.on('zoomend', () => setZoom(map.getZoom()));
  }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
          maxZoom={16}
          bounds={franceBounds}

          noWrap={true}          // ADD THIS - prevents wrapping around the world
        />

        {communesToDisplay.map(commune => (
          <CircleMarker
            key={commune.id}
            center={[commune.lat, commune.lon]}
            radius={3}
            pathOptions={{
              fillColor: '#00d7c0',
              color: '#00d7c0',
              fillOpacity: 0.3,
              weight: 1
            }}
          >
            <Popup>
              <div className='bg-white' style={{borderRadius:"2 2 10 2" }}>
                <div>{commune.bacterio == 1 ? 'oui' : 'non'}</div>
                <h3>{commune.libelle}</h3>
                <div>Date Derniers Prélèvements: {commune.com}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      
    </div>
  )
}

export default CarteFrance




import { useState, useEffect, useRef } from 'react'
import SplashScreen from './splashscreen'
import Header from '../components/Header'
import axios from 'axios'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
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

const SearchBar = ({ communes, onSearchResult, selectedCommune }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const searchRef = useRef(null)
  const map = useMap()

  // Charger l'historique depuis localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('communeSearchHistory')
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Erreur parsing historique:', e)
      }
    }
  }, [])

  // Sauvegarder l'historique dans localStorage
  const saveToHistory = (commune) => {
    const newHistory = [
      { ...commune, timestamp: Date.now() },
      ...searchHistory.filter(item => item.id !== commune.id)
    ].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('communeSearchHistory', JSON.stringify(newHistory))
  }

  // Recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        setIsSearching(true)

        const results = communes
          .filter(commune =>
            commune.libelle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            commune.com?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            commune.dep?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 8)

        setSuggestions(results)
        setIsSearching(false)
        setShowHistory(false)
      } else {
        setSuggestions([])
        setShowHistory(searchTerm.length === 0 && searchHistory.length > 0)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, communes, searchHistory])

  const handleSearch = (commune) => {
    if (commune) {
      saveToHistory(commune)

      map.flyTo([commune.lat, commune.lon], 13, {
        animate: true,
        duration: 1.5
      })

      onSearchResult(commune)
      setSearchTerm('')
      setSuggestions([])
      setShowHistory(false)
    }
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('communeSearchHistory')
    setShowHistory(false)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div
      ref={searchRef}
      className=''
      style={{
        position: 'absolute',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '650px',
        maxWidth: '90%'
      }}
    >
      <div style={{ position: 'relative' }}>
        <svg className='absolute left-2 top-4 z-20' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.6608 23.6611L18.7627 18.7631M1.41077 10.4398C1.41077 15.4228 5.45637 19.4685 10.4394 19.4685C15.4225 19.4685 19.4681 15.4228 19.4681 10.4398C19.4681 5.45674 15.4225 1.41113 10.4394 1.41113C5.45637 1.41113 1.41077 5.45674 1.41077 10.4398Z" stroke="#D4D4D4" stroke-width="2.82146" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchTerm.length === 0 && searchHistory.length > 0) {
              setShowHistory(true)
            }
          }}
          placeholder="Code postal ou ville..."
          style={{
            width: '100%',
            padding: '14px 35px',
            fontSize: '16px',
            border: '2px solid #e0e0e0',
            borderRadius: '30px',
            outline: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            paddingRight: '50px'
          }}
          onMouseEnter={(e) => e.target.style.borderColor = '#00d7c0'}
          onMouseLeave={(e) => {
            if (!e.target.matches(':focus')) {
              e.target.style.borderColor = '#e0e0e0'
            }
          }}
          onFocus={(e) => e.target.style.borderColor = '#00d7c0'}
          onBlur={(e) => {
            e.target.style.borderColor = '#e0e0e0'
            setTimeout(() => setShowHistory(false), 200)
          }}
        />

        {isSearching && (
          <div style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}>
            <div style={{
              width: '22px',
              height: '22px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #00d7c0',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}

        {!isSearching && searchTerm.length === 0 && (
          <div className='flex items-center' style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999',
            fontSize: '20px'
          }}>

            <svg className='mr-2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2042_909)">
                <path d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z" stroke="#004093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12Z" stroke="#004093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 2V4" stroke="#004093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 20V22" stroke="#004093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20 12H22" stroke="#004093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2 12H4" stroke="#004093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_2042_909">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className='text-primary-50 text-sm'>{selectedCommune?.libelle ? `${selectedCommune?.postal} - ${selectedCommune?.libelle}` : "75004, Paris 04"}</span>
          </div>
        )}
      </div>

      {/* Suggestions de recherche */}
      {suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '10px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1001,
          animation: 'slideDown 0.3s ease'
        }}>
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #f0f0f0',
            color: '#666',
            fontSize: '13px',
            fontWeight: 'bold',
            background: '#f9f9f9',
            borderRadius: '15px 15px 0 0'
          }}>
            {suggestions.length} commune(s) trouvée(s)
          </div>
          {suggestions.map((commune) => (
            <div
              key={commune.id}
              onClick={() => handleSearch(commune)}
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdfa'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <span style={{
                background: commune.bacterio == 1 ? '#00d7c0' : '#ff4444',
                color: 'white',
                borderRadius: '12px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {commune.dep}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                  {commune.libelle}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: commune.bacterio == 1 ? '#00a89c' : '#ff4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: commune.bacterio == 1 ? '#00d7c0' : '#ff4444',
                    display: 'inline-block'
                  }} />
                  {commune.bacterio == 1 ? 'Eau conforme' : 'Eau non conforme'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Historique des recherches */}
      {showHistory && searchHistory.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '10px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
          zIndex: 1001,
          animation: 'slideDown 0.3s ease'
        }}>
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#666',
            fontSize: '13px',
            fontWeight: 'bold',
            background: '#f9f9f9',
            borderRadius: '15px 15px 0 0'
          }}>
            <span>📋 Recherches récentes</span>
            <button
              onClick={clearHistory}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff4444',
                cursor: 'pointer',
                fontSize: '12px',
                padding: '5px 10px',
                borderRadius: '15px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#ffe6e6'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              Effacer tout
            </button>
          </div>
          {searchHistory.map((item, index) => (
            <div
              key={item.timestamp || index}
              onClick={() => handleSearch(item)}
              style={{
                padding: '10px 20px',
                borderBottom: index < searchHistory.length - 1 ? '1px solid #f0f0f0' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <span style={{ color: '#00d7c0', fontSize: '16px' }}>🕐</span>
              <span style={{ flex: 1, color: '#333' }}>{item.libelle}</span>
              <span style={{
                color: '#999',
                fontSize: '11px',
                background: '#f5f5f5',
                padding: '3px 8px',
                borderRadius: '12px'
              }}>
                {formatDate(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

const MapControls = ({ communes, onSearchResult, selectedCommune }) => {
  return (
    <>
      <SearchBar communes={communes} onSearchResult={onSearchResult} selectedCommune={selectedCommune} />
    </>
  )
}




function CarteFrance() {
  const [communes, setCommunes] = useState([])
  const [display, setDisplay] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCommune, setSelectedCommune] = useState()
  const [zoom, setZoom] = useState(0)
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
              bacterio: commune.CBL,
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
          bacterio: commune.CBL,
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
  const displayLimit = 5000
  const communesToDisplay = communes.slice(999, displayLimit)
  const handleSearchResult = (commune) => {
    setSelectedCommune(commune)
  }
  return (
    <div className='w-[100%]  flex justify-center items-center flex-col relative'>
      <div className='bg-[url("/images/Wave.png")] -z-40 bg-no-repeat bg-size-cover animate-marquee absolute h-full w-full'></div>

      <Header />

     
      <h1 className='uppercase text-primary-50 font-bold text-3xl my-4'>QUELLE EST LA QUALITÉ DE MON EAU DU ROBINET ?</h1>
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

      {!display && <div className='bg-transparent ' style={{ width: '75%', height: '70vh', position: 'relative' }}>
        <MapContainer
          center={centerFrance}
          zoom={zoom}
          minZoom={0}
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
          <MapControls
            communes={communes}
            onSearchResult={handleSearchResult}
            selectedCommune={selectedCommune}
          />

          {communesToDisplay.map(commune => (
            <CircleMarker
              key={commune.id}
              center={[commune.lat, commune.lon]}
              // radius={3}
              radius={selectedCommune?.id === commune.id ? 10 : 4}
              pathOptions={{
                fillColor: '#00d7c0',
                color: '#00d7c0',
                fillOpacity: 0.3,
                weight: 1
              }}
            >
              <Popup>
                <div className='bg-white' style={{ borderRadius: "2 2 10 2" }}>
                  <div>{commune.bacterio == 1 ? 'oui' : 'non'}</div>
                  <h3>{commune.libelle}</h3>
                  <div>Date Derniers Prélèvements: {commune.com}</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

      </div>}
    </div>
  )
}

export default CarteFrance




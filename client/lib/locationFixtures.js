const FIXTURE_NZ_DUNEDIN = {
  label: "Dunedin",
  className: "",
  location: { lat: -45.8726082, lng: 170.3870355 },
  countyCode: "NZ",
}
const FIXTURE_NZ_WELLINGTON = {
  label: "Wellington",
  className: "",
  location: { lat: -45.8726082, lng: 170.3870355 },
  countyCode: "NZ",
}
const FIXTURE_AU_NSW = {
  label: "New South Wales",
  className: "",
  location: { lat: -32.5080651, lng: 141.0445358 },
  countyCode: "AU",
}
// NZ (New Zealand)
const NZ_FIXTURES = [FIXTURE_NZ_DUNEDIN, FIXTURE_NZ_WELLINGTON]
// AU (Austral)
const AU_FIXTURES = [FIXTURE_AU_NSW]

export const WORLD_FIXTURES = [
  // must resolve to array of objects
  ...NZ_FIXTURES,
  ...AU_FIXTURES,
]

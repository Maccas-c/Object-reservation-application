const fs = require('fs');
const path = require('path');
const SportsFacility = require('./SportsFacility');
const SportsFacilityDetail = require('./SportFacilityDetail');
let rawdata = fs.readFileSync(path.join(__dirname, 'cennik.json'));

const readFile = () => {
    
    let json = JSON.parse(rawdata);
    
    let var1 = new SportsFacilityDetail(json.podzial_boiska[0].name, json.podzial_boiska[0].zajęcia_rekreacyjno_sportowe_treningi,
        json.podzial_boiska[0].mecze_turnieje, json.podzial_boiska[0].uczelniany_Klub_AZS_UAM)
    let var2 = new SportsFacilityDetail(json.podzial_boiska[1].name, json.podzial_boiska[1].zajęcia_rekreacyjno_sportowe_treningi,
        json.podzial_boiska[1].mecze_turnieje, json.podzial_boiska[1].uczelniany_Klub_AZS_UAM)
        
    return new SportsFacility(json.rodzaj_obiektu_sportowego, var1, var2)
}
module.exports.readFile = readFile;

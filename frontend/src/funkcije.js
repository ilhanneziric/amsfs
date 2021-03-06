function getMonthName(month){
    switch(month){
        case 1: return "Januar";
        case 2: return "Februar";
        case 3: return "Mart";
        case 4: return "April";
        case 5: return "Maj";
        case 6: return "Juni";
        case 7: return "Juli";
        case 8: return "Avgust";
        case 9: return "Septembar";
        case 10: return "Oktobar";
        case 11: return "Novembar";
        case 12: return "Decembar";
        default: return "";
    }
}

function getTretmanKategorijaName(tretman){
    switch(tretman){
        case 'kz': return "Kratka ženska";
        case 'sz': return "Srednja ženska";
        case 'dz': return "Duga ženska";
        case 'km': return "Kratka muška";
        case 'sm': return "Srednja muška";
        case 'dm': return "Duga muška";
    }
}

function poredjenjeTermina(obj1, obj2) {
    return (obj1.sat === obj2.sat && obj1.minuta === obj2.minuta);
}



module.exports = {getMonthName, poredjenjeTermina, getTretmanKategorijaName};
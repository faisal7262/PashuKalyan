export default interface Sale {
    _id: string,
    billNo:number,
    lot:number,
    startDate: Date,
    billDate:Date,
    village:string,
    customerName:string,
    mobileNo:string,
    MB?:number,
    JF?:number,
    PDR?:number,
    HF?:number,
    HFX?:number,
    JB?:number,
    JBX?:number,
    KH?:number,
    RK?:number,
    GIR?:number,
    SH?:number,
    DN?:number,
    SHEATH:number,
    GLOVES:number,
    goat?:number,
    goatAmount?:number,
    totalGoat?:number,
    sorted?:number,
    sortedAmount?:number,
    totalsorted?:number,
    extraFSD?:number,
    FSDAmount?:number,
    totalFSD?:number,
    extraAIGloves?:number,
    AIGlovesAmount?:number,
    totalAIGloves?:number,
    extraAISheeth?:number,
    AISheethAmount?:number,
    totalAISheeth?:number,
    LN2?:number,
    LN2Amount?:number,
    TotalLN2Amount?:number,
    totalPackageDose?:number,
    packageAmount?:number,
    extraAmount?:number,
    total?:number,
    gstPer?:number,
    gstAmount?:number,
    finalTotal?:number
}
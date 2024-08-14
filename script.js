document.getElementById('nettingForm').addEventListener('submit', calculateNetting);

function calculateNetting(event) {
    event.preventDefault();

    // Get the width of the window
    let windowWidth = document.getElementById('WindowWidth').value;

    // Calculate the values
    let metresNet = (windowWidth * 3) /100;
    let metresTape = metresNet;
    let numHooks = (windowWidth * 0.2);
    let numRunners = numHooks;

    metresNet = Math.ceil(metresNet);
    metresTape = Math.ceil(metresTape);
    numHooks = Math.ceil(numHooks);
    numRunners = Math.ceil(numHooks);

    // Set the calculated values to the respective input fields
    document.getElementById('MetresNet').value = metresNet;
    document.getElementById('MetresTape').value = metresTape;
    document.getElementById('NumHooks').value = numHooks;
    document.getElementById('NumRunners').value = numRunners;
}

document.getElementById('curtainForm1').addEventListener('submit', calculateCurtain1);

function calculateCurtain1(event){
    event.preventDefault();
    
    let CwindowWidth1 = document.getElementById('CWindowWidth1').value;
    let CwindowHeight1 = document.getElementById('CWindowHeight1').value;

    let NumPFabric1 = (CwindowWidth1 *2) / 120;
    let MetresFabric1 = ((CwindowHeight1 + 25) * NumPFabric1) /10000;
    let MetresCurtainTape1 = (NumPFabric1 * 140) /100;
    let MetresCurtainLining1 = MetresFabric1/2;

    NumPFabric1 = Math.ceil(NumPFabric1);
    MetresFabric1 = Math.ceil(MetresFabric1);
    MetresCurtainTape1 = Math.ceil(MetresCurtainTape1);
    MetresCurtainLining1 = Math.ceil(MetresCurtainLining1);

    document.getElementById('NumPFabric1').value = NumPFabric1;
    document.getElementById('MetresFabric1').value = MetresFabric1;
    document.getElementById('MetresCurtainTape1').value = MetresCurtainTape1;
    document.getElementById('MetresCurtainLining1').value = MetresCurtainLining1;

}

document.getElementById('curtainForm2').addEventListener('submit', calculateCurtain2);

function calculateCurtain2(event){
    event.preventDefault();
    
    let CwindowWidth2 = document.getElementById('CWindowWidth2').value;
    let CwindowHeight2 = document.getElementById('CWindowHeight2').value;

    let NumPFabric2 = (CwindowWidth2 *3) / 280;
    let MetresFabric2 = ((CwindowHeight2 + 25) * NumPFabric2) /10000;
    let MetresCurtainTape2 = (NumPFabric2 * 280) /100;
    let MetresCurtainLining2 = MetresFabric2;

    NumPFabric2 = Math.ceil(NumPFabric2);
    MetresFabric2 = Math.ceil(MetresFabric2);
    MetresCurtainTape2 = Math.ceil(MetresCurtainTape2);
    MetresCurtainLining2 = Math.ceil(MetresCurtainLining2);

    document.getElementById('NumPFabric2').value = NumPFabric2;
    document.getElementById('MetresFabric2').value = MetresFabric2;
    document.getElementById('MetresCurtainTape2').value = MetresCurtainTape2;
    document.getElementById('MetresCurtainLining2').value = MetresCurtainLining2;

}

document.getElementById('curtainForm3').addEventListener('submit', calculateCurtain3);

function calculateCurtain3(event){
    event.preventDefault();
    
    let CwindowWidth3 = document.getElementById('CWindowWidth3').value;
    let CwindowHeight3 = document.getElementById('CWindowHeight3').value;

    let NumPFabric3 = (CwindowWidth3 *2) / 120;
    let MetresFabric3 = ((CwindowHeight3 + 20) * NumPFabric3) /10000;
    let MetresCurtainLining3 = MetresFabric3;
    let MetresCurtainTape3 = (NumPFabric3 * 140) /100;
    let CNumHooks3 = CwindowWidth3 * 0.2;
    let CNumRunners3 = CNumHooks3;

    NumPFabric3 = Math.ceil(NumPFabric3);
    MetresFabric3 = Math.ceil(MetresFabric3);
    MetresCurtainLining3 = Math.ceil(MetresCurtainLining3);
    MetresCurtainTape3 = Math.ceil(MetresCurtainTape3);
    CNumHooks3 = Math.ceil(CNumHooks3);
    CNumRunners3 = Math.ceil(CNumRunners3);
    
    document.getElementById('NumPFabric3').value = NumPFabric3;
    document.getElementById('MetresFabric3').value = MetresFabric3;
    document.getElementById('MetresCurtainTape3').value = MetresCurtainTape3;
    document.getElementById('MetresCurtainLining3').value = MetresCurtainLining3;
    document.getElementById('CNumHooks3').value = CNumHooks3;
    document.getElementById('CNumRunners3').value = CNumRunners3;

}

document.getElementById('curtainForm4').addEventListener('submit', calculateCurtain4);

function calculateCurtain4(event){
    event.preventDefault();
    
    let CwindowWidth4 = document.getElementById('CWindowWidth4').value;
    let CwindowHeight4 = document.getElementById('CWindowHeight4').value;

    let NumPFabric4 = (CwindowWidth4 *2.5) / 120;
    let MetresFabric4 = ((CwindowHeight4 + 20) * NumPFabric4) /10000;
    let MetresCurtainLining4 = MetresFabric4;
    let MetresCurtainTape4 = (NumPFabric4 * 140) /100;
    let CNumHooks4 = CwindowWidth4 * 0.15;
    let CNumRunners4 = CNumHooks4;

    NumPFabric4 = Math.ceil(NumPFabric4);
    MetresFabric4 = Math.ceil(MetresFabric4);
    MetresCurtainLining4 = Math.ceil(MetresCurtainLining4);
    MetresCurtainTape4 = Math.ceil(MetresCurtainTape4);
    CNumHooks4 = Math.ceil(CNumHooks4);
    CNumRunners4 = Math.ceil(CNumRunners4);
    
    document.getElementById('NumPFabric4').value = NumPFabric4;
    document.getElementById('MetresFabric4').value = MetresFabric4;
    document.getElementById('MetresCurtainTape4').value = MetresCurtainTape4;
    document.getElementById('MetresCurtainLining4').value = MetresCurtainLining4;
    document.getElementById('CNumHooks4').value = CNumHooks4;
    document.getElementById('CNumRunners4').value = CNumRunners4;

}


document.getElementById('MnForm1').addEventListener('submit', calculateMn1);

function calculateMn1(event){
    event.preventDefault();
    
    let MnWidth1 = document.getElementById('MnWidth1').value;
    let MnHeight1 = document.getElementById('MnHeight1').value;
    let MnLength1 = document.getElementById('MnLength1').value;

    let NumPFabricM1 = (((MnWidth1 *2) + (MnLength1 *2))* 2) /200;
    let MetresFabricM1 = (MnHeight1 * NumPFabricM1) /100;
    let MetresTapeM1 = (NumPFabricM1 * 180) /100;
    let MetresTetronM1 = MetresTapeM1;
    let MNumHooks1 = ((((MnWidth1 + MnLength1) *2) + 200) * 40);
    let MNumRunners1 = MNumHooks1;
    let LengthRope1 = ((MnLength1 + MnWidth1) * 2) /10000;

    NumPFabricM1 = Math.ceil(NumPFabricM1);
    MetresFabricM1 = Math.ceil(MetresFabricM1);
    MetresTapeM1 = Math.ceil(MetresTapeM1);
    MetresTetronM1 = Math.ceil(MetresTetronM1);
    MNumHooks1 = Math.ceil(MNumHooks1);
    MNumRunners1 = Math.ceil(MNumRunners1);
    LengthRope1 = Math.ceil(LengthRope1);
    
    document.getElementById('NumPFabricM1').value = NumPFabricM1;
    document.getElementById('MetresFabricM1').value = MetresFabricM1;
    document.getElementById('MetresTapeM1').value = MetresTapeM1;
    document.getElementById('MetresTetronM1').value = MetresTetronM1;
    document.getElementById('MNumHooks1').value = MNumHooks1;
    document.getElementById('MNumRunners1').value = MNumRunners1;
    document.getElementById('LengthRope1').value = LengthRope1;
}

document.getElementById('MnForm2').addEventListener('submit', calculateMn2);

function calculateMn2(event){
    event.preventDefault();
    
    let MnWidth2 = document.getElementById('MnWidth2').value;
    let MnHeight2 = document.getElementById('MnHeight2').value;
    let MnLength2 = document.getElementById('MnLength2').value;

    let NumPFabricM2 = ((((MnLength2 + MnWidth2)*2)+400)/180)+1;
    let MetresFabricM2 = (MnHeight2 * NumPFabricM2) /10000;
    let MetresTetronM2 = (NumPFabricM2 * 90) /10000;

    NumPFabricM2 = Math.ceil(NumPFabricM2);
    MetresFabricM2 = Math.ceil(MetresFabricM2);
    MetresTetronM2 = Math.ceil(MetresTetronM2);
    
    document.getElementById('NumPFabricM2').value = NumPFabricM2;
    document.getElementById('MetresFabricM2').value = MetresFabricM2;
    document.getElementById('MetresTetronM2').value = MetresTetronM2;
}

document.getElementById('PelmetForm1').addEventListener('submit', calculateP1);

function calculateP1(event){
    event.preventDefault();
    
    let PWidth1 = document.getElementById('PWidth1').value;
    let PHeight1 = document.getElementById('PHeight1').value;

    let NumPFabricP1 = (PWidth1 * 3) /120;
    let MetresFabricP1 = (PHeight1 +10) * NumPFabricP1;
    let MetresTapeP1 = (MetresFabricP1 * 140) /10000;
    MetresFabricP1 = MetresFabricP1 /10000

    NumPFabricP1 = Math.ceil(NumPFabricP1);
    MetresTapeP1 = Math.ceil(MetresTapeP1);
    MetresFabricP1 = Math.ceil(MetresFabricP1);
    
    document.getElementById('NumPFabricP1').value = NumPFabricP1;
    document.getElementById('MetresFabricP1').value = MetresFabricP1;
    document.getElementById('MetresTapeP1').value = MetresTapeP1;
}

document.getElementById('PelmetForm2').addEventListener('submit', calculateP2);

function calculateP2(event){
    event.preventDefault();
    
    let PWidth2 = document.getElementById('PWidth2').value;
    let PHeight2 = document.getElementById('PHeight2').value;

    let NumPFabricP2 = (PWidth2 * 3) /120;
    let MetresFabricP2 = (PHeight2 +10 * NumPFabricP2) /10000;
    let MetresTapeP2 = MetresFabricP2 * 140;
    let MetresVelcroP2 = PWidth2 /100;
    MetresTapeP2 = MetresTapeP2 /100;

    NumPFabricP2 = Math.ceil(NumPFabricP2);
    MetresFabricP2 = Math.ceil(NumPFabricP2);
    MetresVelcroP2 = Math.ceil(MetresVelcroP2);
    MetresTapeP2 = Math.ceil(MetresTapeP2);
    
    document.getElementById('NumPFabricP2').value = NumPFabricP2;
    document.getElementById('MetresFabricP2').value = MetresFabricP2;
    document.getElementById('MetresTapeP2').value = MetresTapeP2;
    document.getElementById('MetresVelcroP2').value = MetresVelcroP2;
}

document.getElementById('PelmetForm3').addEventListener('submit', calculateP3);

function calculateP3(event){
    event.preventDefault();
    
    let PWidth3 = document.getElementById('PWidth3').value;
    let PHeight3 = document.getElementById('PHeight3').value;

    let NumPFabricP3 = PWidth3 /120;
    let MetresFabricP3 = (PHeight3 +10 * NumPFabricP3) /10000;
    let MetresCurtainLiningP3 = MetresFabricP3;
    let MetresBoardP3 = MetresFabricP3;
    let MetresBraidP3 = (PWidth3 * 1.5 * 2) /100;

    NumPFabricP3 = Math.ceil(NumPFabricP3);
    MetresFabricP3 = Math.ceil(MetresFabricP3);
    MetresCurtainLiningP3 = Math.ceil(MetresCurtainLiningP3);
    MetresBoardP3 = Math.ceil(MetresBoardP3);
    MetresBraidP3 = Math.ceil(MetresBraidP3);

    document.getElementById('NumPFabricP3').value = NumPFabricP3;
    document.getElementById('MetresFabricP3').value = MetresFabricP3;
    document.getElementById('MetresCurtainLiningP3').value = MetresCurtainLiningP3;
    document.getElementById('MetresBoardP3').value = MetresBoardP3;
    document.getElementById('MetresBraidP3').value = MetresBraidP3;
}

document.getElementById('BlindsForm1').addEventListener('submit', calculateB1);

function calculateB1(event){
    event.preventDefault();
    
    let BWidth1 = document.getElementById('BWidth1').value;
    let BLength1 = document.getElementById('BLength1').value;

    let MetresWindowB1 = (BLength1 * BWidth1) /10000;

    MetresWindowB1 = Math.ceil(MetresWindowB1);

    document.getElementById('MetresWindowB1').value = MetresWindowB1;
}

document.getElementById('BlindsForm2').addEventListener('submit', calculateB2);

function calculateB2(event){
    event.preventDefault();
    
    let BWidth2 = document.getElementById('BWidth2').value;
    let BLength2 = document.getElementById('BLength2').value;

    let MetresWindowB2 = (BLength2 * BWidth2) /10000;

    MetresWindowB2 = Math.ceil(MetresWindowB2);

    document.getElementById('MetresWindowB2').value = MetresWindowB2;
}

document.getElementById('BlindsForm3').addEventListener('submit', calculateB3);

function calculateB3(event){
    event.preventDefault();
    
    let BWidth3 = document.getElementById('BWidth3').value;
    let BLength3 = document.getElementById('BLength3').value;

    let MetresWindowB3 = (BLength3 * BWidth3) /10000;

    MetresWindowB3 = Math.ceil(MetresWindowB3);

    document.getElementById('MetresWindowB3').value = MetresWindowB3;
}

document.getElementById('BlindsForm4').addEventListener('submit', calculateB4);

function calculateB4(event){
    event.preventDefault();
    
    let BWidth4 = document.getElementById('BWidth4').value;
    let BLength4 = document.getElementById('BLength4').value;

    let MetresWindowB4 = (BLength4 * BWidth4) /10000;

    MetresWindowB4 = Math.ceil(MetresWindowB4);

    document.getElementById('MetresWindowB4').value = MetresWindowB4;
}
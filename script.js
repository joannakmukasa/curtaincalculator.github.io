document.getElementById('nettingForm').addEventListener('submit', calculateNetting);

function calculateNetting(event) {
    event.preventDefault();

    // Get the width of the window
    let windowWidth = document.getElementById('WindowWidth').value;

    // Calculate the values
    let metresNet = (windowWidth * 3) *100;
    let metresTape = metresNet;
    let numHooks = (windowWidth * 0.2) *100;
    let numRunners = numHooks;

    // Set the calculated values to the respective input fields
    document.getElementById('MetresNet').value = metresNet.toFixed(2);
    document.getElementById('MetresTape').value = metresTape.toFixed(2);
    document.getElementById('NumHooks').value = numHooks.toFixed(2);
    document.getElementById('NumRunners').value = numRunners.toFixed(2);
}

document.getElementById('curtainForm1').addEventListener('submit', calculateCurtain1);

function calculateCurtain1(event){
    event.preventDefault();
    
    let CwindowWidth1 = document.getElementById('CWindowWidth1').value;
    let CwindowHeight1 = document.getElementById('CWindowHeight1').value;

    let NumPFabric1 = (CwindowWidth1 *2) / 120;
    let MetresFabric1 = ((CwindowHeight1 + 25) * NumPFabric1) *100;
    let MetresCurtainTape1 = (NumPFabric1 * 140) *100;
    let MetresCurtainLining1 = MetresFabric1;

    document.getElementById('NumPFabric1').value = NumPFabric1.toFixed(2);
    document.getElementById('MetresFabric1').value = MetresFabric1.toFixed(2);
    document.getElementById('MetresCurtainTape1').value = MetresCurtainTape1.toFixed(2);
    document.getElementById('MetresCurtainLining1').value = MetresCurtainLining1.toFixed(2);

}

document.getElementById('curtainForm2').addEventListener('submit', calculateCurtain2);

function calculateCurtain2(event){
    event.preventDefault();
    
    let CwindowWidth2 = document.getElementById('CWindowWidth2').value.toFixed(2);
    let CwindowHeight2 = document.getElementById('CWindowHeight2').value.toFixed(2);

    let NumPFabric2 = (CwindowWidth2 *3) / 280;
    let MetresFabric2 = ((CwindowHeight2 + 25) * NumPFabric2) *100;
    let MetresCurtainTape2 = (NumPFabric2 * 280) *100;
    let MetresCurtainLining2 = MetresFabric2;

    document.getElementById('NumPFabric2').value = NumPFabric2.toFixed(2);
    document.getElementById('MetresFabric2').value = MetresFabric2;
    document.getElementById('MetresCurtainTape2').value = MetresCurtainTape2.toFixed(2);
    document.getElementById('MetresCurtainLining2').value = MetresCurtainLining2.toFixed(2);

}

document.getElementById('curtainForm3').addEventListener('submit', calculateCurtain3);

function calculateCurtain3(event){
    event.preventDefault();
    
    let CwindowWidth3 = document.getElementById('CWindowWidth3').value;
    let CwindowHeight3 = document.getElementById('CWindowHeight3').value;

    let NumPFabric3 = (CwindowWidth3 *2) / 120;
    let MetresFabric3 = ((CwindowHeight3 + 20) * NumPFabric3) *100;
    let MetresCurtainLining3 = MetresFabric3;
    let MetresCurtainTape3 = (NumPFabric3 * 140) *100;
    let CNumHooks3 = CwindowWidth3 * 0.2;
    let CNumRunners3 = CNumHooks3;
    
    document.getElementById('NumPFabric3').value = NumPFabric3.toFixed(2);
    document.getElementById('MetresFabric3').value = MetresFabric3.toFixed(2);
    document.getElementById('MetresCurtainTape3').value = MetresCurtainTape3.toFixed(2);
    document.getElementById('MetresCurtainLining3').value = MetresCurtainLining3.toFixed(2);
    document.getElementById('CNumHooks3').value = CNumHooks3.toFixed(2);
    document.getElementById('CNumRunners3').value = CNumRunners3.toFixed(2);

}

document.getElementById('curtainForm4').addEventListener('submit', calculateCurtain4);

function calculateCurtain4(event){
    event.preventDefault();
    
    let CwindowWidth4 = document.getElementById('CWindowWidth4').value;
    let CwindowHeight4 = document.getElementById('CWindowHeight4').value;

    let NumPFabric4 = (CwindowWidth4 *2.5) / 120;
    let MetresFabric4 = ((CwindowHeight4 + 20) * NumPFabric4) *100;
    let MetresCurtainLining4 = MetresFabric4;
    let MetresCurtainTape4 = (NumPFabric4 * 140) *100;
    let CNumHooks4 = CwindowWidth4 * 0.15;
    let CNumRunners4 = CNumHooks4;
    
    document.getElementById('NumPFabric4').value = NumPFabric4.toFixed(2);
    document.getElementById('MetresFabric4').value = MetresFabric4.toFixed(2);
    document.getElementById('MetresCurtainTape4').value = MetresCurtainTape4.toFixed(2);
    document.getElementById('MetresCurtainLining4').value = MetresCurtainLining4.toFixed(2);
    document.getElementById('CNumHooks4').value = CNumHooks4.toFixed(2);
    document.getElementById('CNumRunners4').value = CNumRunners4.toFixed(2);

}


document.getElementById('MnForm1').addEventListener('submit', calculateMn1);

function calculateMn1(event){
    event.preventDefault();
    
    let MnWidth1 = document.getElementById('MnWidth1').value;
    let MnHeight1 = document.getElementById('MnHeight1').value;
    let MnLength1 = document.getElementById('MnLength1').value;
// check formulas
    let NumPFabricM1 = (((MnWidth1 *2) / (MnLength1 *2))/200) * (1.5/180);
    let MetresFabricM1 = (MnHeight1 * NumPFabricM1) *100;
    let MetresTapeM1 = (NumPFabricM1 * 180) *100;
    let MetresTetronM1 = MetresTapeM1;
    let MNumHooks1 = ((((MnWidth1 + MnLength1) *2) + 200) * 40);
    let MNumRunners1 = MNumHooks1;
    let LengthRope1 = ((MnLength1 + MnWidth1) * 2) *100;
    
    document.getElementById('NumPFabricM1').value = NumPFabricM1.toFixed(2);
    document.getElementById('MetresFabricM1').value = MetresFabricM1.toFixed(2);
    document.getElementById('MetresTapeM1').value = MetresTapeM1.toFixed(2);
    document.getElementById('MetresTetronM1').value = MetresTetronM1.toFixed(2);
    document.getElementById('MNumHooks1').value = MNumHooks1.toFixed(2);
    document.getElementById('MNumRunners1').value = MNumRunners1.toFixed(2);
    document.getElementById('LengthRope1').value = LengthRope1.toFixed(2);
}

document.getElementById('MnForm2').addEventListener('submit', calculateMn2);

function calculateMn2(event){
    event.preventDefault();
    
    let MnWidth2 = document.getElementById('MnWidth2').value;
    let MnHeight2 = document.getElementById('MnHeight2').value;
    let MnLength2 = document.getElementById('MnLength2').value;

    let NumPFabricM2 = ((((MnLength2 + MnWidth2)*2)+400)/180)+1;
    let MetresFabricM2 = (MnHeight2 * NumPFabricM2) *100;
    let MetresTetronM2 = (NumPFabricM2 * 90) *100;
    
    document.getElementById('NumPFabricM2').value = NumPFabricM2.toFixed(2);
    document.getElementById('MetresFabricM2').value = MetresFabricM2.toFixed(2);
    document.getElementById('MetresTetronM2').value = MetresTetronM2.toFixed(2);
}

document.getElementById('PelmetForm1').addEventListener('submit', calculateP1);

function calculateP1(event){
    event.preventDefault();
    
    let PWidth1 = document.getElementById('PWidth1').value;
    let PHeight1 = document.getElementById('PHeight1').value;

    let NumPFabricP1 = (PWidth1 * 3) /120;
    let MetresFabricP1 = PHeight1 +10 * NumPFabricP1;
    let MetresTapeP1 = (MetresFabricP1 * 140) *100;
    MetresFabricP1 = MetresFabricP1 *100
    
    document.getElementById('NumPFabricP1').value = NumPFabricP1.toFixed(2);
    document.getElementById('MetresFabricP1').value = MetresFabricP1;
    document.getElementById('MetresTapeP1').value = MetresTapeP1;
}

document.getElementById('PelmetForm2').addEventListener('submit', calculateP2);

function calculateP2(event){
    event.preventDefault();
    
    let PWidth2 = document.getElementById('PWidth2').value;
    let PHeight2 = document.getElementById('PHeight2').value;

    let NumPFabricP2 = (PWidth2 * 3) /120;
    let MetresFabricP2 = (PHeight2 +10 * NumPFabricP2) *100;
    let MetresTapeP2 = MetresFabricP2 * 140;
    let MetresVelcroP2 = PWidth2 *100;
    MetresTapeP2 = MetresTapeP2 *100;
    
    document.getElementById('NumPFabricP2').value = NumPFabricP2.toFixed(2);
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
    let MetresFabricP3 = (PHeight3 +10 * NumPFabricP) *100;
    let MetresCurtainLiningP3 = MetresFabricP3;
    let MetresBoardP3 = MetresFabricP3;
    let MetresBraidP3 = (PWidth3 * 1.5 * 2) *100;

    document.getElementById('NumPFabricP3').value = NumPFabricP3.toFixed(2);
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

    let MetresWindowB1 = (BLength1 * BWidth1) *100;

    document.getElementById('MetresWindowB1').value = MetresWindowB1;
}

document.getElementById('BlindsForm2').addEventListener('submit', calculateB2);

function calculateB2(event){
    event.preventDefault();
    
    let BWidth2 = document.getElementById('BWidth2').value;
    let BLength2 = document.getElementById('BLength2').value;

    let MetresWindowB2 = (BLength2 * BWidth2) *100;

    document.getElementById('MetresWindowB2').value = MetresWindowB2;
}

document.getElementById('BlindsForm3').addEventListener('submit', calculateB3);

function calculateB3(event){
    event.preventDefault();
    
    let BWidth3 = document.getElementById('BWidth3').value;
    let BLength3 = document.getElementById('BLength3').value;

    let MetresWindowB3 = (BLength3 * BWidth3) *100;

    document.getElementById('MetresWindowB3').value = MetresWindowB3;
}

document.getElementById('BlindsForm4').addEventListener('submit', calculateB4);

function calculateB4(event){
    event.preventDefault();
    
    let BWidth4 = document.getElementById('BWidth4').value;
    let BLength4 = document.getElementById('BLength4').value;

    let MetresWindowB4 = (BLength4 * BWidth4) *100;

    document.getElementById('MetresWindowB4').value = MetresWindowB4;
}
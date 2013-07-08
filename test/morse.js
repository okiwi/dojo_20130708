"use strict";
var result = [];

var lettresMap = {
	'.-':'A', 
	'-...':'B', 
	'-.-.':'C',
	'.--.': 'P',
	'..': 'I'
};
var char_decompose = function(chr) {
	return [
		lettresMap[chr.substring(0,1)],
		lettresMap[chr.substring(0,2)],
		lettresMap[chr.substring(0,3)],
		lettresMap[chr.substring(0,4)]
	];
}
function morse_interpreter(morse) {
	var chr = "";
	var result = char_decompose(morse+'000')
	for(var c in result) {
		if(!result[c]) delete(result[c]);
	}
	
		
	for(var c in morse) {
		chr += morse[c];
		var next4 = chr;
		for(
			var nextC = c+1 ;
			nextC <= c+3 && nextC < morse.length ;
			nextC++
		){
			next4 += morse[nextC];
			var current_char = morse2asciiMonoCaractère(next4);
			if(current_char) {
				result.push(current_char);
				var destrucs = morse_interpreter(morse.substring(nextC));
				for(var truc in destrucs) {
					result.push(current_char + destrucs[truc]);					
				}
			}
		}
 	}
	return result;
	
	function morse2asciiMonoCaractère(morse){
		if(lettresMap[morse] != undefined){
			return lettresMap[morse];			
		}
	}
} 

describe("Kata Morse", function() {

  it("devrait lire le a", function() {
	var résultat = morse_interpreter(".-");
    expect(résultat).toEqual(["A"]);
  });

	xit("devrait lire le B", function() {
		var résultat = morse_interpreter("-...");
	    expect(résultat).toBe("B");
	});
	
	xit("devrait lire le C", function() {
		var résultat = morse_interpreter("-.-.");
	    expect(résultat).toBe("C");
	});
	
	xit("devrait lire A et B ou P et I", function(){
		var résultat = morse_interpreter(".--...");
	    expect(résultat).toContain("AB");
	    expect(résultat).toContain("PI");
	});
	
	it("devrait retourner les possibles sur 4 chars", function () {
		var decomposed = char_decompose(".--.");
		expect(decomposed).toEqual([undefined, 'A', undefined, 'P'])
	})
});
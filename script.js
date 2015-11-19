var message = "A girl mad with moonbeams shone up to the north, defrosting, unfreezing (that's you). Like all higher beings gracing the tundra, unassuming, secret empress of retail  (probably the place most in need of divinity). Oracle of realness, buddha of CDs, diva of no-bake, first apostle of Bey, Sphinx Clueless, Pope Coolness, princess peony (all you), Grand Duchess of Reeses, the Pharoah of fleek... I hope you don't mind, I just need you to know you're a keystone. I can't keep you in a bubble of two months ago, I carry you with me, and I grow so the you inside me grows too. Out of sync with real you no doubt, inevitably. Some sorts of entanglement never dissolve though, the roots are two deep within the cracks in the stone. I understand why magpies return to roost in trees cut down long long ago. Some hands, once clasped, never let go, really, fingers never come untwined. Some laughs, once laughed never stop warming that place behind the ear"

var letters = [];
var l_i = 0,
    w_i = 0,
    b_i = 0;
var min_d = 25,
    min_o = 0.11;
var fade_d = 30;
var fade_rate = 0.03;
var wave_len = 5,
    wave_period = 10;
var opacity_i = 0.8;
var waveAnimation;

var parent = '#screen'

var forwardColor = '#ffffff',
    //backColor = '#ff3399',
    //backColor = '#cc33ff',
    backColor = '#9966ff';

var waveColor = d3.scale.linear()
    .range([forwardColor, backColor]) 
    .domain([0, wave_len])
    .clamp(true);



$(parent).mousemove(function(e) {
    if (letters.length > 0) {
        var l = letters[l_i-1]
        var p = l.position();
        var x1 = e.clientX,
            y1 = e.clientY,
            x2 = p.left + l.width()/2,
            y2 = p.top + l.height()/2;
        var d = Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
        if (d > min_d) {
            addLetter(e)
            fade()
        }
    } else {
        addLetter(e)
    }
})

$(parent).click(function() {
    w_i = 0;
    waveAnimation = setInterval(function() { wave(true); }, 20)
})

function addLetter(e) {
    var letter = $("<div class='letter' id='letter_"+l_i+"'>"+message[(l_i%message.length)]+"</div>");
    $(parent).append(letter);
    letter.css('left',(e.clientX-10)+"px")
    letter.css('top',(e.clientY-10)+"px")
    letter.css('opacity', opacity_i)
    letters.push(letter)
    l_i++
}

function fade() {
    for (var i = letters.length-1; i >= 0 ; i--) {
        if ((letters.length-1 - i) > fade_d) {
            var l = letters[i]
            if (l.css('opacity') > min_o)
                l.css('opacity',l.css('opacity')-fade_rate)
        }
    }
}

function wave(brighten) {
    //w_i = w_i%wave_period
    w_i_f = letters.length - w_i - 1;
    for (var i = letters.length-1; i >= 0 ; i--) {
        var c_i = Math.max((wave_len - Math.abs(w_i_f - i)),0)
        var l = letters[i]
        l.css('color',waveColor(c_i))
        if (brighten && c_i > 0 ) l.css('opacity', 0.95)
        //else l.css('color',waveColor(c_i))
    }
    w_i++
    if (w_i > (letters.length + wave_len))
        clearInterval(waveAnimation)
}
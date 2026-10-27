// =========================================
// MOCK DATA
// =========================================
const bibleData = {
    "Genesis": { chapters: 50, title: "Ang Paglalang" },
    "Exodo": { chapters: 40, title: "Ang Pag-alis sa Ehipto" },
    "Levitico": { chapters: 27, title: "Mga Batas sa Pagsamba" },
    "Mga Bilang": { chapters: 36, title: "Ang Paglalakbay sa Ilang" },
    "Deuteronomio": { chapters: 34, title: "Ang Pangalawang Batas" },
    "Josue": { chapters: 24, title: "Ang Pananakop sa Canaan" },
    "Mga Hukom": { chapters: 21, title: "Mga Hukom ng Israel" },
    "Ruth": { chapters: 4, title: "Ang Kuwento ni Ruth" },
    "1 Samuel": { chapters: 31, title: "Si Samuel at si Saul" },
    "2 Samuel": { chapters: 24, title: "Si Haring David" },
    "1 Mga Hari": { chapters: 22, title: "Mga Hari ng Israel" },
    "2 Mga Hari": { chapters: 25, title: "Pagbagsak ng Kaharian" },
    "1 Cronica": { chapters: 29, title: "Mga Salaysay ng Kasaysayan" },
    "Mateo": { chapters: 28, title: "Ang Ebanghelyo ni Mateo" },
    "Marcos": { chapters: 16, title: "Ang Ebanghelyo ni Marcos" },
    "Lucas": { chapters: 24, title: "Ang Ebanghelyo ni Lucas" },
    "Juan": { chapters: 21, title: "Ang Ebanghelyo ni Juan" },
    "Mga Gawa": { chapters: 28, title: "Ang Mga Gawa ng Apostol" },
    "Roma": { chapters: 16, title: "Sulat sa Mga Taga-Roma" },
    "1 Corinto": { chapters: 16, title: "Unang Sulat sa Mga Taga-Corinto" },
    "2 Corinto": { chapters: 13, title: "Ikalawang Sulat sa Mga Taga-Corinto" },
    "Galacia": { chapters: 6, title: "Sulat sa Mga Taga-Galacia" },
    "Efeso": { chapters: 6, title: "Sulat sa Mga Taga-Efeso" },
    "Filipos": { chapters: 4, title: "Sulat sa Mga Taga-Filipos" },
    "Colosas": { chapters: 4, title: "Sulat sa Mga Taga-Colosas" },
    "1 Tesalonica": { chapters: 5, title: "Unang Sulat sa Mga Taga-Tesalonica" },
    "1 Pedro": { chapters: 5, title: "Pangangalaga at Pagiging Handa" }
};

const mockVerses = {
    "1": "Sa matatandang namumuno sa inyo, nananawagan ako bilang isa ring matatandang pinuno ng iglesya na tulad ninyo, bilang saksi sa mga paghihirap ni Cristo at sapagkat makakabahagi ako sa karangalang malapit nang ipahayag.",
    "2": "Pangalagaan ninyo ang kawan ng Diyos na ipinagkatiwala sa inyo. Gawin ninyo ito nang maluwag sa loob at hindi napipilitan lamang. [Iyan ang nais ng Diyos.] Gampanan ninyo ang inyong tungkulin, hindi dahil sa kabayaran kundi dahil gusto ninyong makapaglingkod,",
    "3": "hindi bilang panginoon ng inyong nasasakupan, kundi maging halimbawa kayo sa kawan.",
    "4": "At pagparito ng Pinunong Pastol ay tatanggap kayo ng maluwalhating koronang di kukupas kailanman.",
    "5": "At kayo namang mga kabataan, pasakop kayo sa matatandang pinuno ng iglesya. At kayong lahat ay magpakumbaba sapagkat, “Sinasalungat ng Diyos ang mapagmataas, ngunit pinagpapala niya ang mababang-loob.”",
    "6": "Kaya nga, pasakop kayo sa kapangyarihan ng Diyos at dadakilain niya kayo pagdating ng takdang panahon.",
    "7": "Ipagkatiwala ninyo sa kanya ang inyong mga alalahanin sa buhay sapagkat siya ay nagmamalasakit sa inyo."
};

// Global variables para sa Navigation
let currentGlobalBook = "";
let currentGlobalChapter = "";

// =========================================
// NAVIGATION LOGIC
// =========================================
function showScreen(screenName) {
    const screens = ['books-screen', 'chapters-screen', 'reading-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.classList.add('hidden');
            el.classList.remove('screen-active');
        }
    });

    const target = document.getElementById(screenName + '-screen');
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('screen-active');
        
        // Reset scroll
        const scrollArea = target.querySelector('.overflow-y-auto');
        if (scrollArea) scrollArea.scrollTop = 0;
    }
}

function goBackToBooks() {
    showScreen('books');
    if (currentGlobalBook) {
        switchTab('chapter'); 
    } else {
        switchTab('book');
    }
}

// =========================================
// TABS LOGIC (BOOK, CHAPTER, VERSE)
// =========================================
function switchTab(tabName) {
    ['book', 'chapter', 'verse'].forEach(t => {
        document.getElementById('content-' + t).classList.add('hidden');
        document.getElementById('indicator-' + t).classList.add('hidden');
        document.getElementById('tab-' + t).classList.remove('text-white');
        document.getElementById('tab-' + t).classList.add('text-gray-400');
    });

    document.getElementById('content-' + tabName).classList.remove('hidden');
    document.getElementById('indicator-' + tabName).classList.remove('hidden');
    document.getElementById('tab-' + tabName).classList.add('text-white');
    document.getElementById('tab-' + tabName).classList.remove('text-gray-400');
}

// =========================================
// RENDER BOOKS & CHAPTERS
// =========================================
function renderBooks() {
    const bookList = document.getElementById('content-book');
    bookList.innerHTML = '';

    for (const bookName in bibleData) {
        const btn = document.createElement('div');
        btn.className = `bg-white border border-gray-200 py-4 px-3 text-center font-sans text-[0.95rem] text-gray-700 rounded-md cursor-pointer shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:border-yellow-400 hover:text-slate-900 hover:bg-yellow-50 active:scale-95 book-hover-effect`;
        btn.innerText = bookName;
        btn.onclick = () => openBook(bookName);
        bookList.appendChild(btn);
    }
}

function openBook(bookName) {
    currentGlobalBook = bookName;
    
    const chapterTabContent = document.getElementById('content-chapter');
    chapterTabContent.innerHTML = ''; 
    
    const totalChapters = bibleData[bookName].chapters;
    for (let i = 1; i <= totalChapters; i++) {
        const btn = document.createElement('div');
        btn.className = "bg-gray-100 border border-gray-300 rounded-full w-[60px] h-[60px] flex justify-center items-center font-sans text-lg font-bold text-slate-800 cursor-pointer transition-transform duration-200 hover:bg-slate-800 hover:text-white active:scale-90 mx-auto";
        btn.innerText = i;
        btn.onclick = () => openChapter(bookName, i);
        chapterTabContent.appendChild(btn);
    }

    // Lumipat sa CHAPTER tab
    switchTab('chapter');
}

function openChapter(bookName, chapterNum) {
    currentGlobalBook = bookName;
    currentGlobalChapter = chapterNum;

    document.getElementById('reading-book-title').innerText = bookName;
    
    const chapterSelect = document.getElementById('chapter-select');
    chapterSelect.innerHTML = '';
    const totalChapters = bibleData[bookName].chapters;
    for (let i = 1; i <= totalChapters; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        if (i === chapterNum) opt.selected = true;
        chapterSelect.appendChild(opt);
    }

    document.getElementById('reading-chapter-title').innerText = bibleData[bookName].title;

    const verseContainer = document.getElementById('verse-container');
    verseContainer.innerHTML = '';

    if (bookName === "1 Pedro" && chapterNum === 5) {
        for (const verseNum in mockVerses) {
            const span = document.createElement('span');
            span.innerHTML = `<span class="font-sans text-sm text-gray-500 align-super mr-1 font-bold">${verseNum}</span>${mockVerses[verseNum]} `;
            verseContainer.appendChild(span);
        }
    } else {
        verseContainer.innerHTML = `<p><em>(Mock Data) Ang mga verses para sa ${bookName} Chapter ${chapterNum} ay ilalagay dito.</em></p>`;
    }

    // I-update ang VERSE tab list
    const verseTabContent = document.getElementById('content-verse');
    verseTabContent.innerHTML = `
        <div class="font-bold text-slate-800 mb-2">${bookName} ${chapterNum}</div>
        <div class="text-sm text-gray-500 italic">(Verse list mock dito)</div>
    `;

    // Pumasok sa Reading Screen
    showScreen('reading');
}

function changeChapter(newChapter) {
    openChapter(currentGlobalBook, parseInt(newChapter));
    goBackToBooks(); // Para pumasok sa reading ulit with new chapter
    openChapter(currentGlobalBook, parseInt(newChapter)); // Trigger reading screen
}

// =========================================
// SIDE MENU LOGIC
// =========================================
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
    } else {
        menu.classList.add('open');
        overlay.style.display = 'block';
        void overlay.offsetWidth; // Force reflow
        overlay.style.opacity = '1';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menu = document.getElementById('side-menu');
        if (menu && menu.classList.contains('open')) toggleMenu();
    }
});

// =========================================
// APP INITIALIZATION
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    renderBooks();

    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    const mainApp = document.getElementById('main-app');
    
    let progress = 0;
    const totalLoadingTime = 3000; // Pinaliit ko konti para di masyadong matagal mag-load sa testing (pwede mong ibalik sa 10000)
    const intervalTime = 50; 
    const step = 100 / (totalLoadingTime / intervalTime); 

    const interval = setInterval(() => {
        progress += step;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval); 
            
            setTimeout(() => {
                loadingScreen.classList.add('opacity-0', 'scale-95');
                mainApp.classList.remove('opacity-0');
                mainApp.classList.add('opacity-100');
                
                showScreen('books');
                switchTab('book'); // Default tab

                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                }, 700); 

            }, 300); 
        }

        progressBar.style.width = `${progress}%`;
        loadingText.innerText = `${Math.floor(progress)}%`;

    }, intervalTime); 
});
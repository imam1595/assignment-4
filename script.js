
let interviewList = [];
let rejectedList = [];

let currentStatus = 'all';


//step-1 get the total number of jobs. 
let total = document.getElementsByClassName('total'); //returns an HtmlCollection

let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');



let allCards = document.getElementById('allCards');
// console.log(allCards.children.length);

//step-2 toggle button

let allToggleBtn = document.getElementById('all-toggle-btn');
let interviewToggleBtn = document.getElementById('interview-toggle-btn');
let rejectedToggleBtn = document.getElementById('rejected-toggle-btn');


let mainContainer = document.querySelector('main');

let showInerViewRejectList = document.getElementById('show-inerview-reject-list');

//step-1 function job counts

function jobCounts(){
    for(let i = 0; i < total.length; i++){
        total[i].innerText = allCards.children.length;

    }

    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;
}

jobCounts();



//step-2 toggle function

function toggleButton(id){
    // console.log('clicked', id);

    // allToggleBtn.classList.remove('bg-blue-500', 'text-white');
    // interviewToggleBtn.classList.remove('bg-[#f1f2f4]', 'text-gray-600');
    // rejectedToggleBtn.classList.remove('bg-[#f1f2f4]', 'text-gray-600');

    // allToggleBtn.classList.add('bg-[#f1f2f4]', 'text-gray-600');
    // interviewToggleBtn.classList.add('bg-blue-500', 'text-white');
    // rejectedToggleBtn.classList.add('bg-blue-500', 'text-white');
}

//or
allToggleBtn.addEventListener('click', function(e){
    // console.log("clicked", e.target);

    currentStatus = 'all-toggle-btn';

    allToggleBtn.classList.add('bg-blue-500', 'text-white');
    interviewToggleBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedToggleBtn.classList.remove('bg-blue-500', 'text-white');

    allCards.classList.remove('hidden');
    showInerViewRejectList.classList.add('hidden');

})

interviewToggleBtn.addEventListener('click', function(e){
    // console.log('clicked', e.target);
  
    currentStatus = 'interview-toggle-btn';

    allToggleBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedToggleBtn.classList.remove('bg-blue-500', 'text-white');
    interviewToggleBtn.classList.remove('bg-[#f1f2f4]', 'text-gray-600');

    interviewToggleBtn.classList.add('bg-blue-500', 'text-white');

    allCards.classList.add('hidden');
    showInerViewRejectList.classList.remove('hidden');
    renderInterview();


})

rejectedToggleBtn.addEventListener('click', function(e){
    // console.log('clicked', e.target);

    currentStatus = 'rejected-toggle-btn';

    allToggleBtn.classList.remove('bg-blue-500', 'text-white');
    interviewToggleBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedToggleBtn.classList.remove('bg-[#f1f2f4]', 'text-gray-600');

    rejectedToggleBtn.classList.add('bg-blue-500', 'text-white');

    allCards.classList.add('hidden');
    showInerViewRejectList.classList.remove('hidden');
    renderReject();
})


//step-3 interviewList and rejectedList update using event delegation.

mainContainer.addEventListener('click', function(e){
    // console.log(e.target.parentNode.parentNode);

    if(e.target.classList.contains('interview-btn')){
        // console.log('you clicked ', e.target);

        const parentNode = e.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company').innerText;
        const skill = parentNode.querySelector('.skill').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const time = parentNode.querySelector('.time').innerText;
        const money = parentNode.querySelector('.money').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const note = parentNode.querySelector('.note').innerText;

        const jobInfo = {
            companyName,
            skill,
            location,
            time,
            money,
            status: 'Interviewed',
            note
        }

        parentNode.querySelector('.status').innerText = 'Interviewed';

        // console.log(jovInfo);

        // const jobExist = interviewList.find(function(job){
        //     return job.companyName === jobInfo.companyName;
        // });

        const jobExist = interviewList.find(job => job.companyName == jobInfo.companyName);

        if (!jobExist){
            interviewList.push(jobInfo);
        }


        rejectedList = rejectedList.filter(job => job.companyName != jobInfo.companyName);

        jobCounts();

        if(currentStatus == 'rejected-toggle-btn'){
            renderReject();
        }
        
        
        // console.log(interviewList);


        



    } else if(e.target.classList.contains('rejected-btn')){
        // console.log('you clicked', e.target);


        const parentNode = e.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company').innerText;
        const skill = parentNode.querySelector('.skill').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const time = parentNode.querySelector('.time').innerText;
        const money = parentNode.querySelector('.money').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const note = parentNode.querySelector('.note').innerText;

        const jobInfo = {
            companyName,
            skill,
            location,
            time,
            money,
            status: 'Rejected',
            note
        }

        parentNode.querySelector('.status').innerText = 'Rejected';

        // console.log(jobInfo);

        const jobExist = rejectedList.find(job => job.companyName == jobInfo.companyName);

        if (!jobExist){
            rejectedList.push(jobInfo);
        }


        interviewList = interviewList.filter(job => job.companyName != jobInfo.companyName);



        jobCounts();

        if(currentStatus == 'interview-toggle-btn'){
            renderInterview();
        }

        

        // console.log(rejectedList);

        

    }

})


// step-4 interviewed and rejected file create and show on screen.

function renderInterview(){
    showInerViewRejectList.innerHTML = "";

    for(let interview of interviewList){
        let div = document.createElement('div');

        div.className = 'card mt-8 flex justify-between bg-[#f1f2f4] p-5 border';

        div.innerHTML = `
            <div class="space-y-3 text-gray-700">
                    <div>
                        <p class="text-[#002c5c] text-2xl font-bold mb-3 company">${interview.companyName}</p>
                        <p class="skill">${interview.skill}</p>
                    </div>
                    <div class="flex gap-4">
                        <p class="location">${interview.location}</p>
                        <p class="time">${interview.time}</p>
                        <p class="money">${interview.money}</p>
                    </div>
                    <div>
                        <p class="p-2 bg-[#5199e6] w-30 h-10 text-black status">${interview.status}</p>
                        <p class="note">${interview.note}</p>
                    </div>
                    <div>
                        <button class="interview-btn p-2 text-green-400 border-2">INTERVIEW</button>
                        <button class="rejected-btn p-2 text-red-400 border-2">REJECTED</button>
                    </div>
                </div>

                <div class="delete-btn">
                <button>Delete</button>
                </div>
            </div>
        `;

        showInerViewRejectList.appendChild(div);
    }
}


function renderReject(){
    showInerViewRejectList.innerHTML = "";

    for(let rejected of rejectedList){
        let div = document.createElement('div');

        div.className = 'card mt-8 flex justify-between bg-[#f1f2f4] p-5 border';

        div.innerHTML = `
            <div class="space-y-3 text-gray-700">
                    <div>
                        <p class="text-[#002c5c] text-2xl font-bold mb-3 company">${rejected.companyName}</p>
                        <p class="skill">${rejected.skill}</p>
                    </div>
                    <div class="flex gap-4">
                        <p class="location">${rejected.location}</p>
                        <p class="time">${rejected.time}</p>
                        <p class="money">${rejected.money}</p>
                    </div>
                    <div>
                        <p class="p-2 bg-[#5199e6] w-30 h-10 text-black status">${rejected.status}</p>
                        <p class="note">${rejected.note}</p>
                    </div>
                    <div>
                        <button class="interview-btn p-2 text-green-400 border-2">INTERVIEW</button>
                        <button class="rejected-btn p-2 text-red-400 border-2">REJECTED</button>
                    </div>
                </div>

                <div class="delete-btn">
                <button>Delete</button>
                </div>
            </div>
        `;

        showInerViewRejectList.appendChild(div);
    }
}



// if interviewList or rejectList is empty.

function renderEmpty(){
    showInerViewRejectList.innerHTML = "";
    
    let div = document.createElement('div');

    div.className = 'card mt-8 flex justify-between bg-[#f1f2f4] p-5 border';
    
}


let interviewList = [];
let rejectedList = [];



let currentStatus = 'all-toggle-btn';


//step-1 get the total number of jobs. 
let total = document.getElementsByClassName('total'); //returns an HtmlCollection


let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');



let allCards = document.getElementById('allCards');


//step-2 toggle button

let allToggleBtn = document.getElementById('all-toggle-btn');
let interviewToggleBtn = document.getElementById('interview-toggle-btn');
let rejectedToggleBtn = document.getElementById('rejected-toggle-btn');


const totalJobAvail = document.getElementById('totalCount-avail');


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

allToggleBtn.addEventListener('click', function(e){

    currentStatus = 'all-toggle-btn';

    allToggleBtn.classList.add('bg-blue-500', 'text-white');
    interviewToggleBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedToggleBtn.classList.remove('bg-blue-500', 'text-white');


    if(allCards.children.length == 0 && currentStatus == 'all-toggle-btn'){

        allCards.classList.add('hidden');
        showInerViewRejectList.classList.remove('hidden');

        renderEmpty();

    }else{

        allCards.classList.remove('hidden');
        showInerViewRejectList.classList.add('hidden');

    }

    showAllJobs();
    
    
    

})

interviewToggleBtn.addEventListener('click', function(e){

  
    currentStatus = 'interview-toggle-btn';

    allToggleBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedToggleBtn.classList.remove('bg-blue-500', 'text-white');
    interviewToggleBtn.classList.remove('bg-[#f1f2f4]', 'text-gray-600');

    interviewToggleBtn.classList.add('bg-blue-500', 'text-white');

    allCards.classList.add('hidden');
    showInerViewRejectList.classList.remove('hidden');
    renderInterview();

    showInterviewJobs();
    
    

})

rejectedToggleBtn.addEventListener('click', function(e){


    currentStatus = 'rejected-toggle-btn';

    allToggleBtn.classList.remove('bg-blue-500', 'text-white');
    interviewToggleBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedToggleBtn.classList.remove('bg-[#f1f2f4]', 'text-gray-600');

    rejectedToggleBtn.classList.add('bg-blue-500', 'text-white');

    allCards.classList.add('hidden');
    showInerViewRejectList.classList.remove('hidden');
    renderReject();

    showRejectedJobs();
    
})


//step-3 interviewList and rejectedList update using event delegation.

mainContainer.addEventListener('click', function(e){


    const parentNode = e.target.parentNode.parentNode;

    if(e.target.classList.contains('interview-btn')){


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


        const jobExist = interviewList.find(job => job.companyName == jobInfo.companyName);

        if (!jobExist){
            interviewList.push(jobInfo);
        }



        rejectedList = rejectedList.filter(job => job.companyName != jobInfo.companyName);

        jobCounts();

        if(currentStatus == 'rejected-toggle-btn'){
            renderReject();
        }

        showRejectedJobs();
        // showInerViewRejectList();



    } else if(e.target.classList.contains('rejected-btn')){
        

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


        const jobExist = rejectedList.find(job => job.companyName == jobInfo.companyName);

        if (!jobExist){
            rejectedList.push(jobInfo);
        }


        interviewList = interviewList.filter(job => job.companyName != jobInfo.companyName);



        jobCounts();

        if(currentStatus == 'interview-toggle-btn'){
            renderInterview();
        }

        showInterviewJobs();
        // showRejectedJobs();

    } else if(e.target.classList.contains('delete-btn')){


        const companyName = parentNode.querySelector('.company').innerText;

        interviewList = interviewList.filter(job => job.companyName !== companyName);
        rejectedList = rejectedList.filter(job => job.companyName !== companyName);

          // remove from AllCards original list
        const allCardItems = allCards.querySelectorAll('.card');

        for(let card of allCardItems){

        const name = card.querySelector('.company').innerText;

        if(name === companyName){
            card.remove();
        }
    }

        parentNode.remove();

        jobCounts();

        
        // If viewing filtered lists, re-render to handle empty state
        if(currentStatus === 'interview-toggle-btn') {
            showInterviewJobs();
            renderInterview();
        } else if(currentStatus === 'rejected-toggle-btn') {
            showRejectedJobs();
            renderReject();
        }

        if(allCards.children.length == 0 && currentStatus == 'all-toggle-btn'){

            allCards.classList.add('hidden');

            showInerViewRejectList.classList.remove('hidden');

            renderEmpty();

            return;
        } else if(interviewList.length == 0 && currentStatus == 'interview-toggle-btn'){
            renderEmpty();
            return;
        }else if(rejectedList.length == 0 && currentStatus == 'rejected-toggle-btn'){
            renderEmpty();
            return;
        }

        
        
    }

})


// step-4 interviewed and rejected file create and show on screen.

function renderInterview(){
    
    showInerViewRejectList.innerHTML = "";

    if(interviewList.length == 0){
        renderEmpty();
        return;
    }

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

                <div>
                    <img src="./asset/bin.png" alt="bin.pic" class="w-20 h-20 object-contain delete-btn">
                </div>
            </div>
        `;

        showInerViewRejectList.appendChild(div);
    }
}


function renderReject(){
    showInerViewRejectList.innerHTML = "";

    if(rejectedList.length == 0){
        renderEmpty();
        return;
    }

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

                <div>
                    <img src="./asset/bin.png" alt="bin.pic" class="w-20 h-20 object-contain delete-btn">
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

    div.className = 'card mt-8 flex flex-col justify-center align-middle bg-[#f1f2f4] p-5 border';

    div.innerHTML = `
        <div class="flex flex-col items-center justify-center">
            <img src="./asset/jobs.png" alt="" class="w-30 h-30 object-contain">
            <h3>No Jobs Available</h3>
            <p>Check back soon for new opportunities</p>
        </div>
    `;

    showInerViewRejectList.appendChild(div);
    
}


function showAllJobs(){
    totalJobAvail.innerHTML = '';
    let span = document.createElement('span');

    span.innerHTML = `
        <p  id="totalCount-avail"><span class="total">${allCards.children.length}</span> Jobs</p>
    `;

    totalJobAvail.appendChild(span);
}

function showInterviewJobs(){
    totalJobAvail.innerHTML = '';

    let span = document.createElement('span');

    let interviewListLength = interviewList.length;

    span.innerHTML = `
        <span> ${interviewListLength} off ${allCards.children.length} Jobs </span>
    `;

    totalJobAvail.appendChild(span);
}

function showRejectedJobs(){
    totalJobAvail.innerHTML = '';

    let span = document.createElement('span');

    let rejectedListLength = rejectedList.length;

    span.innerHTML = `
        <span> ${rejectedListLength} off ${allCards.children.length} Jobs </span>
    `;

    totalJobAvail.appendChild(span);
}


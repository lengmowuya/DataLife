function page_thought(){
    let List;
    let DomList = document.querySelector(".ThougthList");
    console.log(DomList);
    ThoughtSurface.all((event)=>{
        // console.log(event);
        List = event.target.result;
        // console.log(event);
        List.forEach((item)=>{
            let li = document.createElement("li");
            li.innerText = item.text;
            DomList.appendChild(li);
        });
    });
    
}
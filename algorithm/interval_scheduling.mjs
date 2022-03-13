class Job{
    constructor(jobName, startTime, endTime){
        this.jobName = jobName;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class IntervalScheculder{
    constructor(){
        this.jobs = [];
    }

    addJob(job){
        this.jobs.push(job);
    }

    intervalScheduling(){
        // 종료 시간이 빠른순으로 정렬
        this.jobs.sort((a, b) => a.endTime - b.endTime);

        let result = [];

        for(let currentJob of this.jobs){
            if(result.length == 0){
                result.push(currentJob);
            }else if(currentJob.startTime >= result[result.length - 1].endTime){
                result.push(currentJob);
            }
        }

        console.log(result);
    }
}


let intervalScheculder = new IntervalScheculder();
let a = new Job("A", 0, 6);
let b = new Job("B", 1, 4);
let c = new Job("C", 3, 6);
let d = new Job("D", 3, 8);
let e = new Job("E", 4, 7);
let f = new Job("F", 5, 9);
let g = new Job("G", 6, 10);
let h = new Job("H", 8, 11);

intervalScheculder.addJob(a);
intervalScheculder.addJob(b);
intervalScheculder.addJob(c);
intervalScheculder.addJob(d);
intervalScheculder.addJob(e);
intervalScheculder.addJob(f);
intervalScheculder.addJob(g);
intervalScheculder.addJob(h);

intervalScheculder.intervalScheduling();
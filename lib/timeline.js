export function getExpectedPhase(startDate,timeline){

const months=

(new Date()-new Date(startDate))/
(1000*60*60*24*30);


return timeline.find(

p=>months>=p.start && months<=p.end

);

}

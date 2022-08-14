function escapeHtml(html){const text=document.createTextNode(html),p=document.createElement("p");return p.appendChild(text),p.innerHTML}function isExperiencedProfessional(actor){return actor.data.items.some((item=>"feat"===item.type&&"Experienced Professional"===item.name))}function coinsToString(coins,degreeOfSuccess){return"Critical Failure"===degreeOfSuccess?"none":Object.entries(coins).map((([key,value])=>`${value} ${game.i18n.localize(CONFIG.PF2E.currencies[key])}`)).join(", ")}function postToChat(skillName,earnIncomeResult){const content=function(skillName,earnIncomeResult){const degreeOfSuccess=function(degreeOfSuccessLabel){return 0===degreeOfSuccessLabel?"Critical Failure":1===degreeOfSuccessLabel?"Failure":2===degreeOfSuccessLabel?"Success":"Critical Success"}(earnIncomeResult.degreeOfSuccess),payPerDay=escapeHtml(coinsToString(earnIncomeResult.rewards.perDay,degreeOfSuccess)),combinedPay=escapeHtml(coinsToString(earnIncomeResult.rewards.combined,degreeOfSuccess)),level=earnIncomeResult.level,daysSpentWorking=earnIncomeResult.daysSpentWorking,forDays=daysSpentWorking>1?`<p><strong>Salary for ${daysSpentWorking} days</strong>: ${combinedPay}</p>`:"";return`\n    <div class="pf2e chat-card">\n        <header class="card-header flexrow">\n            <img src="systems/pf2e/icons/equipment/treasure/currency/gold-pieces.webp" title="Income" width="36" height="36">\n            <h3>Earn Income Level ${level}</h3>\n        </header>\n        <div class="card-content">\n            <p><strong>Result</strong>: <span style="color: ${earnIncomeResult.degreeOfSuccess>1?"darkgreen":"darkred"}">${degreeOfSuccess} (DC: ${earnIncomeResult.dc}, Roll: ${earnIncomeResult.roll})</span></p>\n            <p><strong>Skill</strong>: ${escapeHtml(skillName)}</p>\n            <p><strong>Salary per day:</strong> ${payPerDay}</p>\n            ${forDays}\n        </div>\n    </div>\n    `}(skillName,earnIncomeResult),chatData={user:game.user.id,content,speaker:ChatMessage.getSpeaker()};ChatMessage.create(chatData,{})}function isProficiencyWithoutLevel(){return"ProficiencyWithoutLevel"===game.settings.get("pf2e","proficiencyVariant")}function calculateIncome(actor,skill,roll,level,days){const dcOptions={proficiencyWithoutLevel:isProficiencyWithoutLevel()},earnIncomeOptions={useLoreAsExperiencedProfessional:isExperiencedProfessional(actor)&&skill.isLore},income=game.pf2e.actions.earnIncome(level,days,roll,skill.proficiency,earnIncomeOptions,dcOptions);postToChat(skill.name,income)}function askSkillPopupTemplate(skills){const level=parseInt(localStorage.getItem("earnIncomeLevel")??0,10),days=parseInt(localStorage.getItem("earnIncomeDays")??1,10),skillAcronym=localStorage.getItem("earnIncomeSkillAcronym"),assurance="true"===localStorage.getItem("earnIncomeAssurance");return`\n    <form>\n    <div class="form-group">\n        <label>Trained Skills/Lores</label>\n        <select name="skillAcronym">\n            ${skills.map((skill=>`<option value="${skill.acronym}" ${skillAcronym===skill.acronym?"selected":""}>${escapeHtml(skill.name)}</option>`)).join("")}\n        </select>\n    </div>\n    <div class="form-group">\n        <label>Use Assurance</label>\n        <input name="assurance" type="checkbox" ${assurance?"checked":""}>\n    </div>\n    <div class="form-group">\n        <label>Level</label>\n        <select name="level">\n            ${Array(21).fill(0).map(((_,index)=>`<option value="${index}" ${index===level?"selected":""}>${index}</option>`)).join("")}\n        </select>\n    </div>\n    <div class="form-group">\n        <label>Days</label>\n        <input type="number" name="days" value="${days}">\n    </div>\n    </form>\n    `}!function(actor){if(null==actor)ui.notifications.error("You must select at least one PC");else{const skills=function(actor){return Object.entries(actor.data.data.skills).map((([acronym,value])=>{return{acronym,name:(s=value.name,s.charAt(0).toUpperCase()+s.slice(1)),isLore:!0===value.lore,proficiency:(rank=value.rank,0===rank?"untrained":1===rank?"trained":2===rank?"expert":3===rank?"master":"legendary"),rank:value.rank};var rank,s})).filter((skill=>"untrained"!==skill.proficiency))}(actor);new Dialog({title:"Earn Income",content:askSkillPopupTemplate(skills),buttons:{no:{icon:'<i class="fas fa-times"></i>',label:"Cancel"},yes:{icon:'<i class="fas fa-coins"></i>',label:"Earn Income",callback:$html=>{const level=parseInt($html[0].querySelector('[name="level"]').value,10)??1,days=parseInt($html[0].querySelector('[name="days"]').value,10)??1,skillAcronym=$html[0].querySelector('[name="skillAcronym"]').value,assurance=$html[0].querySelector('[name="assurance"]').checked,skill=skills.find((skill=>skill.acronym===skillAcronym));localStorage.setItem("earnIncomeLevel",level),localStorage.setItem("earnIncomeDays",days),localStorage.setItem("earnIncomeSkillAcronym",skillAcronym),localStorage.setItem("earnIncomeAssurance",assurance),function(actor,skill,assurance,level,days){if(assurance){const actorLevel=actor.data.data.details?.level?.value??1,proficiencyBonus=(isProficiencyWithoutLevel()?0:actorLevel)+2*skill.rank;calculateIncome(actor,skill,{dieValue:10,modifier:proficiencyBonus},level,days)}else{const options=actor.getRollOptions(["all","skill-check",skill.name]);options.push("earn-income"),game.pf2e.Check.roll(new game.pf2e.CheckModifier('<span style="font-family: Pathfinder2eActions">A</span> Earn Income',actor.data.data.skills[skill.acronym],[]),{actor,type:"skill-check",options},event,(roll=>{const dieValue=roll.dice[0].results[0].result,modifier=roll._total-dieValue;calculateIncome(actor,skill,{dieValue,modifier},level,days)}))}}(actor,skill,assurance,level,days)}}},default:"yes"}).render(!0)}}(actor);
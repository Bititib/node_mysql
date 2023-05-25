const labelService = require("../service/label.service");
// const MomentLabelService = require("../service/moment_label.service")


const verifyLabelEexit =async (ctx,next) =>{
        // 获取客户端传来的数据，数据类型json ——> {"labels":[]}
        const {labels } = ctx.request.body
        const newLabels = [];
        for(const name of labels){
            const result = await labelService.querLabelName(name);
            const labelObj = {name}
            if(result){
                labelObj.id = result.id
            }else{
                // 插入数据
                const resulter = await labelService.createContent(name);
                // 数据插入成功后会返回一个插入的位置 ID ————> insertId
                labelObj.id = resulter.insertId

            }
            newLabels.push(labelObj)
        }
        ctx.labels = newLabels

        await next()
  
}

//  任务都在一个组件中完成
// class LabelContorller {
//     async createLabel(ctx,next){
//     // 获取客户端穿过来的数据,数据的类型为数组
//     const {labels} = ctx.request.body
//     const newLabels = []
//     for(const label of labels){

//         const result = await labelService.querLabelName(label);
//         const labelObj = {"name":label}
//         if(result){
//             // 获取对应标签的label_id
//             labelObj.id = result.id 
//             // 存在及执行moment_label表进行插入操作
//             const resulter = await MomentLabelService.InsertML(moment_id,label_id)
//             if(!resulter) return console.log('失败')

//         }else{
//             // 不存在先添加
//             const resultName = await labelService.createContent(label)
//             // 获取插入的label的id序号
//             labelObj.id = resultName.insertId
//             // 执行moment_label表进行插入操作
//             const resulter = await MomentLabelService.InsertML(moment_id,label_id)
            
//             if(!resulter) return console.log('失败')

//         }
//         newLabels.push(labelObj)
//     }
//     ctx.labels = newLabels
//     await next()
      
//     }
// }
module.exports = {
    verifyLabelEexit
}
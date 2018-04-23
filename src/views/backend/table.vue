<template>
 <div>
   <el-button
     class="add_btn"
     type="primary"
     icon="plus"
     @click="dialogFormVisible = true">
     新增</el-button>
   <el-table
     :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
     border
     style="width: 900px">
     <el-table-column
       type="selection"
       width="55">
     </el-table-column>
     <el-table-column
       prop="date"
       label="出生日期"
       width="180">
     </el-table-column>
     <el-table-column
       prop="name"
       label="姓名"
      >
     </el-table-column>
     <el-table-column
       prop="address"
       label="地址">
       <template scope="scope">
         <el-popover trigger="hover" placement="top">
           <p>住址: {{ scope.row.address }}</p>
           <div slot="reference" class="name-wrapper">
             <el-tag size="medium">{{ scope.row.address }}</el-tag>
           </div>
         </el-popover>
       </template>
     </el-table-column>
     <el-table-column
       label="操作"
       width="100"
      >
       <template scope="scope">
         <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
         <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
   <div class="dividePage">
     <el-pagination
       small
       layout="prev, pager, next"
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[10, 20, 50, 100]"
       :page-size="pagesize"
       :total="tableData.length"
        >
     </el-pagination>
   </div>

   <!--新增对话框-->
   <el-dialog
     title="个人信息"
     :visible.sync="dialogFormVisible"
     @close="closeDialog('form')"
   >
     <el-form :model="form" :rules="rules" ref="form">
       <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
         <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
       </el-form-item>
       <el-form-item label="地址" :label-width="formLabelWidth"  prop="address">
         <el-input v-model="form.address" placeholder="请输入地址"></el-input>
       </el-form-item>
       <el-form-item label="出生日期" :label-width="formLabelWidth"  prop="date">
         <el-date-picker
           v-model="form.date"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="resetForm('form')" >取 消</el-button>
       <el-button type="primary"  @click="submitForm('form')">确 定</el-button>
     </div>
   </el-dialog>
   <!--编辑对话框-->
   <el-dialog
     title="个人信息"
     :visible.sync="editDialogFormVisible"
     @close="closeDialog('edit_form')"
   >
     <el-form :model="edit_form" :rules="rules" ref="edit_form">
       <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
         <el-input v-model="edit_form.name" placeholder="请输入姓名"></el-input>
       </el-form-item>
       <el-form-item label="地址" :label-width="formLabelWidth"  prop="address">
         <el-input v-model="edit_form.address" placeholder="请输入地址"></el-input>
       </el-form-item>
       <el-form-item label="出生日期" :label-width="formLabelWidth"  prop="date">
         <el-date-picker
           v-model="edit_form.date"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="resetForm('edit_form')" >取 消</el-button>
       <el-button type="primary"  @click="edit_submitForm('edit_form')">确 定</el-button>
     </div>
   </el-dialog>
 </div>
</template>

<script>
    export default {
      name: "table",
      data(){
          return{
            tableData: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
            dialogFormVisible: false,
            editDialogFormVisible: false,
            currentPage:1,
            pagesize:5,
            edit_form:{
              name: '',
              address: '',
              date: '',
            },
            form: {
              name: '',
              address: '',
              date: '',
            },
            rules: {
              name: [
                {required: true, message: '请输入姓名', trigger: 'blur'},
                {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
              ],
              address: [
                {required: true, message: '请输入地址', trigger: 'change'},
                {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
              ],
              date: [
                {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
              ]
            },
            formLabelWidth: '120px',
            //编辑当前数据的index
            edit_index:''

          }
      },
      mounted(){
        this.pageTotal = this.tableData.length;
      },
      methods:{
        //新增提交状态
        submitForm(formName) {
          let add_data = {};
          this.$refs[formName].validate((valid) => {
            if (valid) {
              add_data.name = this.form.name;
              add_data.address = this.form.address;
              let new_date = new Date(this.form.date);
              let month = "";
              let date = "";
              //在个位数月份的日期前加0
              if(new_date.getMonth()+1<10){
                month = "0"+ (new_date.getMonth()+1)
              }else{
                month = (new_date.getMonth()+1)
              }
              if(new_date.getDate()<10){
                date = "0"+ new_date.getDate()
              }else{
                date = new_date.getDate()
              }
              add_data.date = new_date.getFullYear() + '-' + month + '-' + date;

              this.tableData.unshift(add_data);
              console.log(add_data);
              this.dialogFormVisible = false;
              //清空
              this.$refs[formName].resetFields();
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //pageSize 改变时会触发，回调参数每页条数size
        handleSizeChange: function (size) {
          console.log(size)
          this.pagesize = size;
        },
        //currentPage 改变时会触发 回调参数当前页currentPage
        handleCurrentChange: function(currentPage){
          console.log(currentPage);
          this.currentPage = currentPage;
        },
        //新增撤回清空状态
        resetForm(formName) {
          this.dialogFormVisible = false;
          this.editDialogFormVisible = false;
          this.$refs[formName].resetFields();
        },
        closeDialog(formName){
          this.$refs[formName].resetFields();
        },
        //编辑提交
        edit_submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
             // alert('submit!');
              this.editDialogFormVisible = true;
              this.tableData[this.edit_index].name =  this.edit_form.name;
              this.tableData[this.edit_index].date =  this.edit_form.date;
              this.tableData[this.edit_index].address =  this.edit_form.address;
              console.log(this.tableData[this.edit_index]);

              let Reg = /^(\d{4})-(\d{2})-(\d{2})$/;
              if (!Reg.test(this.tableData[this.edit_index].date)) {
                let new_date = new Date(this.tableData[this.edit_index].date);
                let month = "";
                let date = "";
                //在个位数月份的日期前加0
                if(new_date.getMonth()+1<10){
                  month = "0"+ (new_date.getMonth()+1)
                }else{
                  month = (new_date.getMonth()+1)
                }
                if(new_date.getDate()<10){
                  date = "0"+ new_date.getDate()
                }else{
                  date = new_date.getDate()
                }
                this.tableData[this.edit_index].date = new_date.getFullYear() + '-' + month + '-' + date;
                this.editDialogFormVisible = false;
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
              }
              } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //编辑
        handleClick(row,index) {
          console.log(row,index);
          this.editDialogFormVisible = true;
          this.edit_index = index;
          console.log(typeof row.date )
          this.edit_form.date = new Date(row.date);
          this.edit_form.name = row.name;
          this.edit_form.address = row.address;
        },
        //删除元素
        handleDelete(index, row) {
          //console.log(index, row);
          this.tableData.splice(index,1);
        }
      }
    }
</script>

<style>
.dividePage{
  width: 900px;
}
.el-pagination{
    float: right;
  }
</style>

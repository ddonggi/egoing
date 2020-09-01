import React,{Component} from 'react';
import './App.css';
import TOC from './components/TOC'
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import Control from './components/Control'
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component{
  constructor(props){//state 값 초기화
    super(props);

    this.max_content_id = 3;
    this.state={
      mode:'read',
      selected_content_id:1,
      subject:{title:'web', sub:'World Wide Web'},
      welcome:{title:'welcome!',desc:'welcome to react!!'},
      contents:[
        {id:1,title:'HTML',desc:'HTML is good'},
        {id:2,title:'CSS',desc:'CSS is amazing'},
        {id:3,title:'JS',desc:'JS is fantastic'}
      ]
    }
//state가 바뀌면 렌더함수가 다시 호출된다
//그 자식컴포넌트들의 렌더함수도 다시호출된다.
  }

getReadContent(){
  for(let i=0; i<this.state.contents.length; i++){
    let data = this.state.contents[i];
    if(data.id === this.state.selected_content_id){
      return data;
       break;
     } 
}
}
getContent(){
  let _title,_desc,_article = null;
  if(this.state.mode === 'welcome'){
    _title = this.state.welcome.title;
    _desc = this.state.welcome.desc;
    _article=<ReadContent title={_title} desc={_desc}></ReadContent>
  }else if(this.state.mode ==='read'){
    var _content = this.getReadContent();
    _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
  }else if(this.state.mode ==='create'){
    _article=<CreateContent onSubmit={(_title,_desc)=>{
      this.max_content_id = this.max_content_id +1;
      
      let _contents = this.state.contents.concat({
        id:this.max_content_id,title:_title,desc:_desc}
      )
      this.setState({
        contents: _contents,
        mode:'read',
        selected_content_id : this.max_content_id
      });
    }}></CreateContent>
  }else if(this.state.mode ==='update'){
    _content = this.getReadContent();
    _article = <UpdateContent data={_content} onSubmit={(_id,_title,_desc)=>{
      var _contents = Array.from(this.state.contents)
      for(var i =0; i< _contents.length; i++){
        if(_contents[i].id===_id){
          _contents[i] = {id:_id,title:_title,desc:_desc}
        break;
        }
      }
      this.setState({
        contents:_contents,
        mode:'read'
      });
    }}></UpdateContent>
  }
  return _article;
}

  render(){
   console.log('app render');
   
    return (
     <div className="App">     
        <Subject
            title={this.state.subject.title}
            sub={this.state.subject.sub}
            onChangePage={()=>this.setState({mode:'welcome'})}
          >
        </Subject>
        <TOC
          onChangePage={(id)=>{
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
          });
          }}
          data={this.state.contents}
        >          
        </TOC>
        <Control onChangeMode={(_mode)=>{
          if(_mode ==='delete'){
            if(window.confirm('정말 삭제하시겠습니까?')){
              let _contents = Array.from(this.state.contents);
              for(var i=0; i<_contents.length; i++){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                }
              }
              this.setState({
                mode:'welcome',
                contents:_contents,
               
              });
              alert('삭제되었습니다')
            }
          }else{
          this.setState({mode:_mode})
        }}}
        >
        </Control>
        {this.getContent()}
     </div>
    
  );
}
}

export default App;

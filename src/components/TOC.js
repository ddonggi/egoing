import React,{Component} from 'react';

class TOC extends Component{
    shouldComponentUpdate(newProps,newState){
      console.log("should",
      newProps.data,
      this.props.data);
      if(this.props.data ===newProps.data){
        return false;
      }
      return true;
    }
    render(){
      console.log('toc')
      const list = [];
      var data = this.props.data;
      for(var i=0; i<data.length; i++){
        list.push(
        <li key={data[i].id}>
          <a href={"/content/"+data[i].id}
          data-id={data[i].id}
          onClick={(e)=>{          
            e.preventDefault();
            this.props.onChangePage( e.target.dataset.id);
          }}
          >
            {data[i].title}
          </a>
        </li>)
      }
      return(
        <nav>
        <ul>
            {list}
        </ul>
        </nav>
      )
    }
  }

export default TOC
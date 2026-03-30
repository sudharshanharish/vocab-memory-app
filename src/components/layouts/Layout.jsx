export default function Layout(props){
  
   const {children} = props;
    return (
        <>
          <header>
            <h1 className="text-gradient">VocabSprint 🚀</h1>
            </header>
          <main>
          {children}
          </main>
           <footer>
       
            <small>Created by</small>
            <a target="_blank" href="https://github.com/sudharshanharish">
            <img alt= "pfp" src="https://avatars.githubusercontent.com/u/51760134?s=400&v=4" />
            <p>@sudharshanharish</p>
        <i className="fa-brands fa-github"></i>

            </a>
            </footer> 
            </>
          
    )
}
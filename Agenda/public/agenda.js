var Aula = React.createClass({
  showPath: function() { 
    return "/aula/" + this.props.id; 
  },
  cssClasses: function() {
    return ['aula', this.props.presence].join(' ');
  },
  render: function() {
    return (
      <a className={this.cssClasses()} href={this.showPath()} data={this.props.day} hora={this.props.hour} >
        {this.props.aluno}
      </a>
    );
  }
});

var Horario = React.createClass({
  renderMyClasses: function() {
    return this.props.classes.map(function(a) {
      return (
        <Aula key={a.id} aluno={a.aluno} day={a.day} hour={a.hour} id={a.id} presence={a.presence}/>
      );
    });
  },

  render: function() {
    return (
      <div className="horario">
        <b>{this.props.hour}:00</b>
        {this.renderMyClasses()}
      </div>
    );
  }
});

var Dia = React.createClass({
  workHours: function() {
    return [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  },

  renderHours: function() {
    return this.workHours().map(function(hour) {
      var key = this.props.day + '-' + hour;
      return (
        <Horario key={key} day={this.props.day} hour={hour} classes={this.props.classes[hour] || []} />
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div className="dia">
        <h3>{this.props.day}</h3>
        {this.renderHours()}
      </div>
    );
  }
});

var Agenda = React.createClass({
  weekDays: [
    "10/11/2015",
    "11/11/2015",
    "12/11/2015",
    "13/11/2015",
    "14/11/2015",
    "15/11/2015",
    "16/11/2015"
  ],

  getInitialState: function() {
    return {classes: {}};
  },

  renderDays: function() {
    return this.weekDays.map(function(day) {
      return ( <Dia key={day} day={day} classes={this.state.classes[day] || {}} /> );
    }.bind(this));
  },

  refresh: function() {
    $.ajax({
      url: 'aulas.json',
      dataType: 'json',
      cache: false,
      success: function(aulas) {
        this.setState({classes: aulas});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className='agenda'>
      <h1>Agenda</h1>
      <a href='#' onClick={this.refresh}>Refresh</a>
      <div>{this.renderDays()}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <Agenda/>,
  document.getElementById('agenda')
);
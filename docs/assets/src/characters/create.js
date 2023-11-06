const createCharacter = (
  app, 
  name, 
  color, 
  callback = false, 
  attributes = {}
) => {

  const folder = './assets/ressources/characters/'
  
  /**
   * Give possibiity to change default url for the texture (use different texture for npc)
   */
  const changeTexture = url => (
    url.includes('Peasant Nolant') && url.includes('.png')
      ? folder + 'peasant/' + color + '.png'
      : url
  )
  app.hooks.addFilter('loadRessourceURL', changeTexture)

  app.characters.add({
    name       : name,
    file       : folder + 'peasant/peasant.fbx',
    card       : folder + 'main/main.png',
    animations : {
      run     : folder + 'peasant/animations/run.fbx', 
      idle    : folder + 'peasant/animations/idle.fbx',
      angry   : folder + 'peasant/animations/angry.fbx',
      walk    : folder + 'peasant/animations/walk.fbx',
      stretch : folder + 'peasant/animations/stretch.fbx',
      sit     : folder + 'peasant/animations/sit.fbx',
      look    : folder + 'peasant/animations/look.fbx',
    },
    attributes : {
      speed: {
        run: 0.5,
        walk: 0.13
      },
      ...attributes
    }
  }, character => {

    /**
     * Only the main character has the privilege of the hat
     */
    if( character.name !== 'main' ) {
      character.object.children[1].removeFromParent()
    }
    character.object.scale.set(0.5, 0.5, 0.5)
    character.object.rotation.x = Math.PI / 2

    app.hooks.removeFilter('loadRessourceURL', changeTexture)
    callback(character)
  })
}

export default createCharacter

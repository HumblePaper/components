/**
 * @page TODO togo.tag 
 * @description
 * a test component details
 * @example simple
 * <todo></todo>
 * <script>
 * riot.mount('todo', {
 *    title: 'I want to behave!',
 *      items: [
 *        { title: 'Avoid excessive caffeine', done: true },
 *        { title: 'Hidden item',  hidden: true },
 *        { title: 'Be less provocative'  },
 *        { title: 'Be nice to people' }
 *     ]
 *  })
 * </script>
 */

<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items.filter(whatShow) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>


  <!-- this script tag is optional -->
    this.items = opts.items

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.input.value = ''
      }
    }

    removeAllDone(e) {
      this.items = this.items.filter(function(item) {
        return !item.done
      })
    }

    // an two example how to filter items on the list
    whatShow(item) {
      return !item.hidden
    }

    onlyDone(item) {
      return item.done
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }

</todo>
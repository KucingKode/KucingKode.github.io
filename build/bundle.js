
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.6' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function sineInOut(t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src/components/IntersectionObserver.svelte generated by Svelte v3.42.6 */
    const file$1 = "src/components/IntersectionObserver.svelte";
    const get_default_slot_changes = dirty => ({ intersecting: dirty & /*intersecting*/ 1 });
    const get_default_slot_context = ctx => ({ intersecting: /*intersecting*/ ctx[0] });

    function create_fragment$1(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "mb-5");
    			add_location(div, file$1, 50, 0, 1152);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[9](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, intersecting*/ 129)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[9](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IntersectionObserver', slots, ['default']);
    	let { once = false } = $$props;
    	let { top = 0 } = $$props;
    	let { bottom = 0 } = $$props;
    	let { left = 0 } = $$props;
    	let { right = 0 } = $$props;
    	let intersecting = false;
    	let container;

    	onMount(() => {
    		if (!IntersectionObserver) {
    			window.addEventListener('scroll', handler);
    			return () => window.removeEventListener('scroll', handler);
    		}

    		const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

    		const observer = new IntersectionObserver(entries => {
    				$$invalidate(0, intersecting = entries[0].isIntersecting);

    				if (intersecting && once) {
    					observer.unobserve(container);
    				}
    			},
    		{ rootMargin, threshold: 0.5 });

    		observer.observe(container);
    		return () => observer.unobserve(container);

    		// ---------------------------------
    		function handler() {
    			const bcr = container.getBoundingClientRect();
    			$$invalidate(0, intersecting = bcr.bottom + bottom > 0 && bcr.right + right > 0 && bcr.top - top < window.innerHeight && bcr.left - left < window.innerWidth);

    			if (intersecting && once) {
    				window.removeEventListener('scroll', handler);
    			}
    		}
    	});

    	const writable_props = ['once', 'top', 'bottom', 'left', 'right'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IntersectionObserver> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(1, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('once' in $$props) $$invalidate(2, once = $$props.once);
    		if ('top' in $$props) $$invalidate(3, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(4, bottom = $$props.bottom);
    		if ('left' in $$props) $$invalidate(5, left = $$props.left);
    		if ('right' in $$props) $$invalidate(6, right = $$props.right);
    		if ('$$scope' in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		once,
    		top,
    		bottom,
    		left,
    		right,
    		intersecting,
    		container
    	});

    	$$self.$inject_state = $$props => {
    		if ('once' in $$props) $$invalidate(2, once = $$props.once);
    		if ('top' in $$props) $$invalidate(3, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(4, bottom = $$props.bottom);
    		if ('left' in $$props) $$invalidate(5, left = $$props.left);
    		if ('right' in $$props) $$invalidate(6, right = $$props.right);
    		if ('intersecting' in $$props) $$invalidate(0, intersecting = $$props.intersecting);
    		if ('container' in $$props) $$invalidate(1, container = $$props.container);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		intersecting,
    		container,
    		once,
    		top,
    		bottom,
    		left,
    		right,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class IntersectionObserver_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			once: 2,
    			top: 3,
    			bottom: 4,
    			left: 5,
    			right: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IntersectionObserver_1",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get once() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set once(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get right() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set right(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.42.6 */

    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[17] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	return child_ctx;
    }

    // (80:6) {#each pageSections as section}
    function create_each_block_2(ctx) {
    	let a;
    	let t0_value = /*section*/ ctx[20] + "";
    	let t0;
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "text-base font-bold text-sm md:text-md mx-1 md:mx-2 py-1 hover:border-b-4 border-base transition ");
    			attr_dev(a, "href", a_href_value = '#' + slugify(/*section*/ ctx[20]));
    			add_location(a, file, 80, 8, 1796);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pageSections*/ 4 && t0_value !== (t0_value = /*section*/ ctx[20] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*pageSections*/ 4 && a_href_value !== (a_href_value = '#' + slugify(/*section*/ ctx[20]))) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(80:6) {#each pageSections as section}",
    		ctx
    	});

    	return block;
    }

    // (97:8) {#if intersecting}
    function create_if_block_5(ctx) {
    	let h1;
    	let h1_intro;
    	let t1;
    	let div;
    	let img;
    	let img_src_value;
    	let img_intro;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Build Application That Useful For Anyone";
    			t1 = space();
    			div = element("div");
    			img = element("img");
    			attr_dev(h1, "class", "text-[10vw] md:text-[5em] text-center md:w-[55vw] font-extrabold leading-[1.1em] drop-shadow-sm text-heading moving ");
    			add_location(h1, file, 97, 10, 2267);
    			attr_dev(img, "class", "w-screen h-[35vh]");
    			if (!src_url_equal(img.src, img_src_value = "/assets/wave.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file, 108, 12, 2695);
    			attr_dev(div, "class", "w-screen h-screen flex flex-col-reverse absolute top-0 z-[-1]");
    			add_location(div, file, 107, 10, 2607);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, /*appear*/ ctx[8], { duration: 1000, delay: 300 });
    					h1_intro.start();
    				});
    			}

    			if (!img_intro) {
    				add_render_callback(() => {
    					img_intro = create_in_transition(img, /*appear*/ ctx[8], { duration: 500 });
    					img_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(97:8) {#if intersecting}",
    		ctx
    	});

    	return block;
    }

    // (95:2) <IntersectionObserver let:intersecting once={true}>
    function create_default_slot_4(ctx) {
    	let div;
    	let if_block = /*intersecting*/ ctx[13] && create_if_block_5(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "w-screen h-screen flex flex-col justify-center items-center px-5");
    			add_location(div, file, 95, 4, 2151);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*intersecting*/ ctx[13]) {
    				if (if_block) {
    					if (dirty & /*intersecting*/ 8192) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(95:2) <IntersectionObserver let:intersecting once={true}>",
    		ctx
    	});

    	return block;
    }

    // (119:6) {#if intersecting}
    function create_if_block_4(ctx) {
    	let div;
    	let svg;
    	let path0;
    	let path1;
    	let svg_intro;
    	let t0;
    	let h2;
    	let t1;
    	let span;
    	let h2_intro;
    	let t3;
    	let p;
    	let t4;
    	let strong0;
    	let t6;
    	let strong1;
    	let t8;
    	let p_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			t0 = space();
    			h2 = element("h2");
    			t1 = text("Who Am I");
    			span = element("span");
    			span.textContent = "?";
    			t3 = space();
    			p = element("p");
    			t4 = text("My name is Fazle and I am a developer also a student from Indonesia,\n            i love building application especially a web application,\n            i love to build application that useful for anyone and has simple\n            user interface that create amazing user experience.\n            I build web apps with some languages\n            like ");
    			strong0 = element("strong");
    			strong0.textContent = "Javascript, Typescript, CSS, HTML";
    			t6 = text(", and\n            sometimes using frameworks like ");
    			strong1 = element("strong");
    			strong1.textContent = "React, Svelte, and Tailwind";
    			t8 = text(".");
    			attr_dev(path0, "d", "M480 31.4235C432.974 12.8053 302.77 -8.07378 158.164 57.3561C13.5586 122.786 -2.60664 47.7145 7.38643 2");
    			attr_dev(path0, "stroke", "#FF505A");
    			attr_dev(path0, "stroke-width", "10");
    			add_location(path0, file, 128, 12, 3412);
    			attr_dev(path1, "d", "M500 51.4235C454.162 32.8053 327.247 11.9262 186.295 77.3561C45.3424 142.786 29.5855 67.7145 39.3261 22");
    			attr_dev(path1, "stroke", "#C62368");
    			attr_dev(path1, "stroke-width", "10");
    			add_location(path1, file, 129, 12, 3575);
    			attr_dev(svg, "class", "hidden lg:block absolute z-[-1] right-0 moving ");
    			attr_dev(svg, "width", "459");
    			attr_dev(svg, "height", "109");
    			attr_dev(svg, "viewBox", "0 0 459 109");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file, 122, 10, 3141);
    			attr_dev(span, "class", "text-muted");
    			add_location(span, file, 137, 19, 3943);
    			attr_dev(h2, "class", "text-[8vw] lg:text-[4em] mb-9 text-accent font-bold ");
    			add_location(h2, file, 131, 10, 3753);
    			add_location(strong0, file, 150, 17, 4529);
    			add_location(strong1, file, 151, 44, 4629);
    			attr_dev(p, "class", "text-md md:text-[1.5em] text-base lg:w-[70%] leading-[1.7em] ");
    			add_location(p, file, 139, 10, 3993);
    			attr_dev(div, "class", "md:w-[80%] border-l-8 border-muted px-14 mx-auto");
    			add_location(div, file, 121, 6, 3068);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(div, t0);
    			append_dev(div, h2);
    			append_dev(h2, t1);
    			append_dev(h2, span);
    			append_dev(div, t3);
    			append_dev(div, p);
    			append_dev(p, t4);
    			append_dev(p, strong0);
    			append_dev(p, t6);
    			append_dev(p, strong1);
    			append_dev(p, t8);
    		},
    		i: function intro(local) {
    			if (!svg_intro) {
    				add_render_callback(() => {
    					svg_intro = create_in_transition(svg, /*appear*/ ctx[8], { duration: 500, delay: 500 });
    					svg_intro.start();
    				});
    			}

    			if (!h2_intro) {
    				add_render_callback(() => {
    					h2_intro = create_in_transition(h2, /*appear*/ ctx[8], { duration: 1000, delay: 500 });
    					h2_intro.start();
    				});
    			}

    			if (!p_intro) {
    				add_render_callback(() => {
    					p_intro = create_in_transition(p, /*appear*/ ctx[8], { duration: 1200, delay: 800 });
    					p_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(119:6) {#if intersecting}",
    		ctx
    	});

    	return block;
    }

    // (116:2) <IntersectionObserver let:intersecting once={true}>
    function create_default_slot_3(ctx) {
    	let h3;
    	let t1;
    	let div;
    	let if_block = /*intersecting*/ ctx[13] && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "About Me";
    			t1 = space();
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(h3, "id", "about");
    			attr_dev(h3, "class", "opacity-0");
    			add_location(h3, file, 116, 4, 2943);
    			attr_dev(div, "class", "w-screen py-14");
    			add_location(div, file, 117, 4, 2994);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*intersecting*/ ctx[13]) {
    				if (if_block) {
    					if (dirty & /*intersecting*/ 8192) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(116:2) <IntersectionObserver let:intersecting once={true}>",
    		ctx
    	});

    	return block;
    }

    // (163:6) {#if intersecting}
    function create_if_block_3(ctx) {
    	let a;
    	let div;
    	let h2;
    	let t1;
    	let p0;
    	let t2_value = /*certificates*/ ctx[0][0][0] + "";
    	let t2;
    	let t3;
    	let p1;
    	let t4_value = /*certificates*/ ctx[0][0][1] + "";
    	let t4;
    	let div_intro;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Certificates";
    			t1 = space();
    			p0 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p1 = element("p");
    			t4 = text(t4_value);
    			attr_dev(h2, "class", "mb-2 text-primary");
    			add_location(h2, file, 171, 12, 5297);
    			attr_dev(p0, "class", "text-primary font-bold text-center");
    			add_location(p0, file, 172, 12, 5357);
    			attr_dev(p1, "class", "text-primary text-center");
    			add_location(p1, file, 177, 12, 5526);
    			attr_dev(div, "class", "bg-gradient-to-br from-accent to-secondary rounded-3xl flex flex-col items-center justify-center p-5 ");
    			add_location(div, file, 164, 10, 5064);
    			attr_dev(a, "class", "w-[80%]");
    			attr_dev(a, "href", a_href_value = /*certificates*/ ctx[0][0][2]);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener");
    			add_location(a, file, 163, 8, 4949);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(p0, t2);
    			/*p0_binding*/ ctx[9](p0);
    			append_dev(div, t3);
    			append_dev(div, p1);
    			append_dev(p1, t4);
    			/*p1_binding*/ ctx[10](p1);
    			/*a_binding*/ ctx[11](a);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*certificates*/ 1 && t2_value !== (t2_value = /*certificates*/ ctx[0][0][0] + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*certificates*/ 1 && t4_value !== (t4_value = /*certificates*/ ctx[0][0][1] + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*certificates*/ 1 && a_href_value !== (a_href_value = /*certificates*/ ctx[0][0][2])) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, /*appear*/ ctx[8], { duration: 1000 });
    					div_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			/*p0_binding*/ ctx[9](null);
    			/*p1_binding*/ ctx[10](null);
    			/*a_binding*/ ctx[11](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(163:6) {#if intersecting}",
    		ctx
    	});

    	return block;
    }

    // (161:2) <IntersectionObserver let:intersecting once={true}>
    function create_default_slot_2(ctx) {
    	let div;
    	let if_block = /*intersecting*/ ctx[13] && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "w-screen h-36 flex flex-col justify-center items-center");
    			add_location(div, file, 161, 4, 4846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*intersecting*/ ctx[13]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*intersecting*/ 8192) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(161:2) <IntersectionObserver let:intersecting once={true}>",
    		ctx
    	});

    	return block;
    }

    // (193:8) {#if intersecting}
    function create_if_block_1(ctx) {
    	let h2;
    	let t0;
    	let span0;
    	let t2;
    	let span1;
    	let h2_intro;
    	let t4;
    	let div;
    	let if_block = /*lazy*/ ctx[7] && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text("My ");
    			span0 = element("span");
    			span0.textContent = "<";
    			t2 = text("Projects");
    			span1 = element("span");
    			span1.textContent = "/>";
    			t4 = space();
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(span0, "class", "text-muted");
    			add_location(span0, file, 200, 14, 6211);
    			attr_dev(span1, "class", "text-muted");
    			add_location(span1, file, 200, 58, 6255);
    			attr_dev(h2, "class", "text-[8vw] lg:text-[4em] mb-9 text-accent font-bold ml-20 ");
    			add_location(h2, file, 193, 10, 6007);
    			attr_dev(div, "class", "py-5 flex flex-wrap justify-center md:justify-start");
    			add_location(div, file, 202, 10, 6309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			append_dev(h2, span0);
    			append_dev(h2, t2);
    			append_dev(h2, span1);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*lazy*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (!h2_intro) {
    				add_render_callback(() => {
    					h2_intro = create_in_transition(h2, /*appear*/ ctx[8], { duration: 1000, delay: 500 });
    					h2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(193:8) {#if intersecting}",
    		ctx
    	});

    	return block;
    }

    // (204:12) {#if lazy}
    function create_if_block_2(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*projects*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projects*/ 2) {
    				each_value_1 = /*projects*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(204:12) {#if lazy}",
    		ctx
    	});

    	return block;
    }

    // (205:14) {#each projects as project}
    function create_each_block_1(ctx) {
    	let a;
    	let img;
    	let img_src_value;
    	let img_title_value;
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			t = space();
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "class", "w-80 h-52 object-cover m-1 border-4 rounded-md border-muted shadow-lg hover:border-accent ");
    			if (!src_url_equal(img.src, img_src_value = /*project*/ ctx[17][2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "title", img_title_value = /*project*/ ctx[17][0]);
    			attr_dev(img, "alt", "");
    			add_location(img, file, 206, 18, 6527);
    			attr_dev(a, "href", a_href_value = /*project*/ ctx[17][1]);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener");
    			add_location(a, file, 205, 16, 6456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projects*/ 2 && !src_url_equal(img.src, img_src_value = /*project*/ ctx[17][2])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*projects*/ 2 && img_title_value !== (img_title_value = /*project*/ ctx[17][0])) {
    				attr_dev(img, "title", img_title_value);
    			}

    			if (dirty & /*projects*/ 2 && a_href_value !== (a_href_value = /*project*/ ctx[17][1])) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(205:14) {#each projects as project}",
    		ctx
    	});

    	return block;
    }

    // (190:2) <IntersectionObserver let:intersecting once={true}>
    function create_default_slot_1(ctx) {
    	let div;
    	let h3;
    	let t1;
    	let if_block = /*intersecting*/ ctx[13] && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			h3.textContent = "My Projects";
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(h3, "id", "projects");
    			attr_dev(h3, "class", "opacity-0");
    			add_location(h3, file, 191, 8, 5910);
    			attr_dev(div, "class", "w-screen px-10 py-20 border-b-2 border-secondary");
    			add_location(div, file, 190, 4, 5839);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*intersecting*/ ctx[13]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*intersecting*/ 8192) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(190:2) <IntersectionObserver let:intersecting once={true}>",
    		ctx
    	});

    	return block;
    }

    // (231:8) {#if intersecting}
    function create_if_block(ctx) {
    	let h1;
    	let h1_intro;
    	let t1;
    	let div;
    	let each_value = /*mediaLinks*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Found Me On";
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "text-[10vw] md:text-[5em] text-center font-extrabold leading-[1.1em] drop-shadow-sm text-heading mb-5 ");
    			add_location(h1, file, 231, 10, 7941);
    			attr_dev(div, "class", "links");
    			add_location(div, file, 239, 10, 8201);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*mediaLinks*/ 8) {
    				each_value = /*mediaLinks*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, /*appear*/ ctx[8], { duration: 1000 });
    					h1_intro.start();
    				});
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(231:8) {#if intersecting}",
    		ctx
    	});

    	return block;
    }

    // (241:12) {#each mediaLinks as link}
    function create_each_block(ctx) {
    	let a;
    	let t0_value = /*link*/ ctx[14][0] + "";
    	let t0;
    	let t1;
    	let a_href_value;
    	let a_intro;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "text-heading font-bold text-lg mx-1 md:mx-2 py-1 hover:border-b-4 border-heading transition ");
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[14][1]);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener");
    			add_location(a, file, 241, 14, 8275);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*mediaLinks*/ 8 && t0_value !== (t0_value = /*link*/ ctx[14][0] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*mediaLinks*/ 8 && a_href_value !== (a_href_value = /*link*/ ctx[14][1])) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (!a_intro) {
    				add_render_callback(() => {
    					a_intro = create_in_transition(a, fade, {});
    					a_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(241:12) {#each mediaLinks as link}",
    		ctx
    	});

    	return block;
    }

    // (225:2) <IntersectionObserver let:intersecting once={true}>
    function create_default_slot(ctx) {
    	let div;
    	let svg;
    	let path;
    	let t0;
    	let h3;
    	let t2;
    	let if_block = /*intersecting*/ ctx[13] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t0 = space();
    			h3 = element("h3");
    			h3.textContent = "Social Media";
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(path, "d", "M520.75 46.2501C576.312 90.0001 607.812 163.5 605.187 230.438C602.562 297.375 565.812 357.75 532.125 405.875C498.437 454.438 467.812 490.313 430.625 517.875C393.437 545.438 349.25 564.25 305.062 564.688C260.875 565.125 216.687 547.188 178.625 520.063C140.562 492.5 109.062 456.188 70.9998 405.875C32.9373 355.563 -11.2502 291.688 2.74985 246.625C16.7498 201.563 89.8123 175.313 150.187 133.313C210.562 90.8751 257.812 33.1251 321.687 10.8126C385.125 -11.0624 464.75 2.50011 520.75 46.2501Z");
    			attr_dev(path, "fill", "#FF505A");
    			add_location(path, file, 227, 10, 7311);
    			attr_dev(svg, "class", "absolute md:left-28 z-[-1] moving");
    			attr_dev(svg, "width", "606");
    			attr_dev(svg, "height", "565");
    			attr_dev(svg, "viewBox", "0 0 606 565");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file, 226, 8, 7159);
    			attr_dev(h3, "class", "opacity-0");
    			attr_dev(h3, "id", "contact");
    			add_location(h3, file, 229, 8, 7851);
    			attr_dev(div, "class", "w-screen h-screen flex flex-col justify-center items-center");
    			add_location(div, file, 225, 4, 7077);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    			append_dev(div, t0);
    			append_dev(div, h3);
    			append_dev(div, t2);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*intersecting*/ ctx[13]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*intersecting*/ 8192) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(225:2) <IntersectionObserver let:intersecting once={true}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let nav;
    	let a;
    	let t0;
    	let span;
    	let t2;
    	let div;
    	let t3;
    	let intersectionobserver0;
    	let t4;
    	let intersectionobserver1;
    	let t5;
    	let intersectionobserver2;
    	let t6;
    	let intersectionobserver3;
    	let t7;
    	let intersectionobserver4;
    	let current;
    	let each_value_2 = /*pageSections*/ ctx[2];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	intersectionobserver0 = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot_4,
    						({ intersecting }) => ({ 13: intersecting }),
    						({ intersecting }) => intersecting ? 8192 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	intersectionobserver1 = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot_3,
    						({ intersecting }) => ({ 13: intersecting }),
    						({ intersecting }) => intersecting ? 8192 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	intersectionobserver2 = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot_2,
    						({ intersecting }) => ({ 13: intersecting }),
    						({ intersecting }) => intersecting ? 8192 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	intersectionobserver3 = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot_1,
    						({ intersecting }) => ({ 13: intersecting }),
    						({ intersecting }) => intersecting ? 8192 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	intersectionobserver4 = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot,
    						({ intersecting }) => ({ 13: intersecting }),
    						({ intersecting }) => intersecting ? 8192 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			nav = element("nav");
    			a = element("a");
    			t0 = text("fazle");
    			span = element("span");
    			span.textContent = "au";
    			t2 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			create_component(intersectionobserver0.$$.fragment);
    			t4 = space();
    			create_component(intersectionobserver1.$$.fragment);
    			t5 = space();
    			create_component(intersectionobserver2.$$.fragment);
    			t6 = space();
    			create_component(intersectionobserver3.$$.fragment);
    			t7 = space();
    			create_component(intersectionobserver4.$$.fragment);
    			attr_dev(span, "class", "text-heading");
    			add_location(span, file, 76, 11, 1678);
    			attr_dev(a, "class", "text-accent font-bold text-md md:text-xl");
    			attr_dev(a, "href", "/");
    			add_location(a, file, 72, 4, 1588);
    			attr_dev(div, "class", "ml-auto");
    			add_location(div, file, 78, 4, 1728);
    			attr_dev(nav, "class", "bg-white w-screen fixed h-[4em] shadow-md flex items-center px-5 md:px-16 z-50 ");
    			add_location(nav, file, 66, 2, 1468);
    			attr_dev(main, "class", "overflow-x-hidden");
    			add_location(main, file, 65, 0, 1433);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, nav);
    			append_dev(nav, a);
    			append_dev(a, t0);
    			append_dev(a, span);
    			append_dev(nav, t2);
    			append_dev(nav, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(main, t3);
    			mount_component(intersectionobserver0, main, null);
    			append_dev(main, t4);
    			mount_component(intersectionobserver1, main, null);
    			append_dev(main, t5);
    			mount_component(intersectionobserver2, main, null);
    			append_dev(main, t6);
    			mount_component(intersectionobserver3, main, null);
    			append_dev(main, t7);
    			mount_component(intersectionobserver4, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*slugify, pageSections*/ 4) {
    				each_value_2 = /*pageSections*/ ctx[2];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			const intersectionobserver0_changes = {};

    			if (dirty & /*$$scope, intersecting*/ 8396800) {
    				intersectionobserver0_changes.$$scope = { dirty, ctx };
    			}

    			intersectionobserver0.$set(intersectionobserver0_changes);
    			const intersectionobserver1_changes = {};

    			if (dirty & /*$$scope, intersecting*/ 8396800) {
    				intersectionobserver1_changes.$$scope = { dirty, ctx };
    			}

    			intersectionobserver1.$set(intersectionobserver1_changes);
    			const intersectionobserver2_changes = {};

    			if (dirty & /*$$scope, certificates, certificateLink, certificateYear, certificateName, intersecting*/ 8396913) {
    				intersectionobserver2_changes.$$scope = { dirty, ctx };
    			}

    			intersectionobserver2.$set(intersectionobserver2_changes);
    			const intersectionobserver3_changes = {};

    			if (dirty & /*$$scope, projects, lazy, intersecting*/ 8396930) {
    				intersectionobserver3_changes.$$scope = { dirty, ctx };
    			}

    			intersectionobserver3.$set(intersectionobserver3_changes);
    			const intersectionobserver4_changes = {};

    			if (dirty & /*$$scope, mediaLinks, intersecting*/ 8396808) {
    				intersectionobserver4_changes.$$scope = { dirty, ctx };
    			}

    			intersectionobserver4.$set(intersectionobserver4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(intersectionobserver0.$$.fragment, local);
    			transition_in(intersectionobserver1.$$.fragment, local);
    			transition_in(intersectionobserver2.$$.fragment, local);
    			transition_in(intersectionobserver3.$$.fragment, local);
    			transition_in(intersectionobserver4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intersectionobserver0.$$.fragment, local);
    			transition_out(intersectionobserver1.$$.fragment, local);
    			transition_out(intersectionobserver2.$$.fragment, local);
    			transition_out(intersectionobserver3.$$.fragment, local);
    			transition_out(intersectionobserver4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			destroy_component(intersectionobserver0);
    			destroy_component(intersectionobserver1);
    			destroy_component(intersectionobserver2);
    			destroy_component(intersectionobserver3);
    			destroy_component(intersectionobserver4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function slugify(str) {
    	return str.toLowerCase().replace(/[ _/]/g, '-');
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { certificates } = $$props;
    	let { projects } = $$props;
    	let { pageSections } = $$props;
    	let { mediaLinks } = $$props;
    	let certificateName, certificateYear, certificateLink;
    	let lazy = false;
    	let i = 1;

    	onMount(() => {
    		window.scrollTo({ top: 0 });

    		setInterval(
    			() => {
    				if (!(certificateName && certificateLink && certificateYear)) return;
    				$$invalidate(4, certificateName.innerText = certificates[i][0], certificateName);
    				$$invalidate(5, certificateYear.innerText = certificates[i][1], certificateYear);
    				$$invalidate(6, certificateLink.href = certificates[i][2], certificateLink);
    				create_in_transition(certificateName, fade, { duration: 500 }).start();
    				create_in_transition(certificateYear, fade, { duration: 500 }).start();
    				i = i === certificates.length - 1 ? 0 : i + 1;
    			},
    			2500
    		);

    		$$invalidate(7, lazy = true);
    	});

    	// animations
    	function appear(node, { duration, delay = 0 }) {
    		return {
    			duration,
    			delay,
    			css: t => {
    				const eased = sineInOut(t);

    				return `
					transform: translateY(${1 - eased}em);
					opacity: ${eased}
        `;
    			}
    		};
    	}

    	const writable_props = ['certificates', 'projects', 'pageSections', 'mediaLinks'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function p0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			certificateName = $$value;
    			$$invalidate(4, certificateName);
    		});
    	}

    	function p1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			certificateYear = $$value;
    			$$invalidate(5, certificateYear);
    		});
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			certificateLink = $$value;
    			$$invalidate(6, certificateLink);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('certificates' in $$props) $$invalidate(0, certificates = $$props.certificates);
    		if ('projects' in $$props) $$invalidate(1, projects = $$props.projects);
    		if ('pageSections' in $$props) $$invalidate(2, pageSections = $$props.pageSections);
    		if ('mediaLinks' in $$props) $$invalidate(3, mediaLinks = $$props.mediaLinks);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		sineInOut,
    		onMount,
    		create_in_transition,
    		IntersectionObserver: IntersectionObserver_1,
    		certificates,
    		projects,
    		pageSections,
    		mediaLinks,
    		certificateName,
    		certificateYear,
    		certificateLink,
    		lazy,
    		i,
    		slugify,
    		appear
    	});

    	$$self.$inject_state = $$props => {
    		if ('certificates' in $$props) $$invalidate(0, certificates = $$props.certificates);
    		if ('projects' in $$props) $$invalidate(1, projects = $$props.projects);
    		if ('pageSections' in $$props) $$invalidate(2, pageSections = $$props.pageSections);
    		if ('mediaLinks' in $$props) $$invalidate(3, mediaLinks = $$props.mediaLinks);
    		if ('certificateName' in $$props) $$invalidate(4, certificateName = $$props.certificateName);
    		if ('certificateYear' in $$props) $$invalidate(5, certificateYear = $$props.certificateYear);
    		if ('certificateLink' in $$props) $$invalidate(6, certificateLink = $$props.certificateLink);
    		if ('lazy' in $$props) $$invalidate(7, lazy = $$props.lazy);
    		if ('i' in $$props) i = $$props.i;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		certificates,
    		projects,
    		pageSections,
    		mediaLinks,
    		certificateName,
    		certificateYear,
    		certificateLink,
    		lazy,
    		appear,
    		p0_binding,
    		p1_binding,
    		a_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			certificates: 0,
    			projects: 1,
    			pageSections: 2,
    			mediaLinks: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*certificates*/ ctx[0] === undefined && !('certificates' in props)) {
    			console.warn("<App> was created without expected prop 'certificates'");
    		}

    		if (/*projects*/ ctx[1] === undefined && !('projects' in props)) {
    			console.warn("<App> was created without expected prop 'projects'");
    		}

    		if (/*pageSections*/ ctx[2] === undefined && !('pageSections' in props)) {
    			console.warn("<App> was created without expected prop 'pageSections'");
    		}

    		if (/*mediaLinks*/ ctx[3] === undefined && !('mediaLinks' in props)) {
    			console.warn("<App> was created without expected prop 'mediaLinks'");
    		}
    	}

    	get certificates() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set certificates(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get projects() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pageSections() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pageSections(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mediaLinks() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mediaLinks(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        certificates: [
          // [title, year, link]
          [
            'Freecodecamp Responsive Web Design Certification',
            '2021',
            'https://www.freecodecamp.org/certification/fazle/responsive-web-design'
          ],
          [
            'Freecodecamp JavaScript Algorithms and Data Structures Certification',
            '2021',
            'https://www.freecodecamp.org/certification/fazle/javascript-algorithms-and-data-structures'
          ],
          [
            'Freecodecamp Front End Development Libraries Certification',
            '2021',
            'https://www.freecodecamp.org/certification/fazle/front-end-development-libraries'
          ],
          [
            'Freecodecamp Data Visualization Certification',
            '2021',
            'https://www.freecodecamp.org/certification/fazle/data-visualization'
          ],
          [
            'Freecodecamp Back End Development and APIs Certification',
            '2021',
            'https://www.freecodecamp.org/certification/fazle/back-end-development-and-apis'
          ]
        ],

        projects: [
          // [title, link, image]
          [
            'Freecodecamp: Choropleth Map',
            'https://kucingkode.github.io/FCC-Data-Visualization/end/choropleth-map.html',
            '/assets/choropleth.png'
          ],
          [
            'Freecodecamp: Heat Map',
            'https://kucingkode.github.io/FCC-Data-Visualization/end/heat-map.html',
            '/assets/heat.png'
          ],
          [
            'Freecodecamp: Treemap Diagram',
            'https://kucingkode.github.io/FCC-Data-Visualization/end/treemap-diagram.html',
            '/assets/treemap.png'
          ],
          [
            'Freecodecamp: Scatterplot Graph',
            'https://kucingkode.github.io/FCC-Data-Visualization/end/scatterplot-graph.html',
            '/assets/scatter.png'
          ],
          [
            'Freecodecamp: Bar Chart',
            'https://kucingkode.github.io/FCC-Data-Visualization/end/bar-chart.html',
            '/assets/bar.png'
          ],
          [
            'Freecodecamp Project: 25 + 5 Clock',
            'https://codepen.io/CatKode/full/LYygvaN',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/LYygvaN.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1628392202&width=960'
          ],
          [
            'Freecodecamp Project: Calculator',
            'https://codepen.io/CatKode/full/MWmPvjq',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/MWmPvjq.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628300574&width=960'
          ],
          [
            'Freecodecamp: Drum Machine',
            'https://codepen.io/CatKode/full/OJmBWaX',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/OJmBWaX.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628223430&width=960'
          ],
          [
            'Freecodecamp: Markdown Previewer',
            'https://codepen.io/CatKode/full/xxdawwy',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/xxdawwy.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1628146276&width=960'
          ],
          [
            'Freecodecamp: Survey Form',
            'https://codepen.io/CatKode/full/poPaoXE',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/poPaoXE.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627361756&width=960'
          ],
          [
            'Freecodecamp: Quote Generator',
            'https://codepen.io/CatKode/full/KKmxPvV',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/KKmxPvV.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628062841&width=960'
          ],
          [
            'Freecodecamp: Tribute Page',
            'https://codepen.io/CatKode/full/Exmobmm',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/Exmobmm.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627285991&width=960'
          ],
          [
            'Freecodecamp: Product Landing Page',
            'https://codepen.io/CatKode/full/wvdyMBB',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/wvdyMBB.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627447215&width=960'
          ],
          [
            'Freecodecamp: Technical Documentation Page',
            'https://codepen.io/CatKode/details/mdmxBOe',
            'https://assets.codepen.io/6644886/internal/screenshots/pens/mdmxBOe.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1627557943&width=960'
          ]
        ],

        mediaLinks: [
          // [media, link]
          ['Github', 'https://github.com/KucingKode/'],
          ['Codepen', 'https://github.com/KucingKode/'],
          ['Codewars', 'https://codepen.io/CatKode'],
          ['Freecodecamp', 'https://www.freecodecamp.org/fazle'],
          ['Email', 'mailto:fazlecode@gmail.com']
        ],
        pageSections: ['About', 'Projects', 'Contact']
      }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
